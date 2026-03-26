import type { Core } from "@strapi/strapi";

const PUBLIC_ROUTES = [
  "/api/auth/local",
  "/api/auth/local/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
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

    // 2. Get role
    const userRole = await strapi.entityService.findMany(
      "api::user-role.user-role",
      {
        filters: {
          users_permissions_user: {
            id: user.id,
          },
        },
      }
    );

    if (!userRole || userRole.length === 0) {
      return ctx.forbidden("No role assigned");
    }

    const role = userRole[0].userRole;
    const status = userRole[0].Stats;

    // 3. Check status
    if (status === "PENDING") {
      return ctx.forbidden("Account is pending approval");
    }

    // 4. OPTIONAL: Route-based RBAC
    if (path.startsWith("/api/organizer") && role !== "ORGANIZER") {
      return ctx.forbidden("Organizer only");
    }

    if (path.startsWith("/api/resident") && role !== "RESIDENT") {
      return ctx.forbidden("Resident only");
    }

    // pass
    await next();
  };
};