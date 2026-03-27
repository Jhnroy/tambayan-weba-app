import type { Core } from "@strapi/strapi";

const PUBLIC_ROUTES = [
  "/api/auth/local",
  "/api/auth/local/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/users/me", // ✅ IMPORTANT (fix for your frontend issue)
];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const path = ctx.request.path;

    // 0. Skip public routes
    if (PUBLIC_ROUTES.some((route) => path.startsWith(route))) {
      return await next();
    }

    // 1. Get logged-in user
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in");
    }

    // 2. Get role (SAFE QUERY)
    let userRole: any[] = [];

    try {
      userRole = await strapi.entityService.findMany(
        "api::user-role.user-role",
        {
          filters: {
            users_permissions_user: {
              id: user.id,
            },
          },
        }
      );
    } catch (err) {
      console.error("RBAC ERROR:", err);
   
      return await next();
    }

    if (!userRole || userRole.length === 0) {
      console.warn("No role assigned for user:", user.id);
      return await next();
    }

    const role = userRole[0].userRole;
    const status = userRole[0].Stats;

    // 3. Block only if pending
    if (status === "PENDING") {
      return ctx.forbidden("Account is pending approval");
    }

    // 4. Route-based RBAC (STRICT ONLY WHERE NEEDED)

    // Organizer-only routes
    if (path.startsWith("/api/organizer")) {
      if (role !== "ORGANIZER") {
        return ctx.forbidden("Organizer only");
      }
    }

    // Resident-only routes
    if (path.startsWith("/api/resident")) {
      if (role !== "RESIDENT") {
        return ctx.forbidden("Resident only");
      }
    }

    // ✅ allow everything else (like participations)
    await next();
  };
};