

import API from "@/lib/api";



export type UserRole = "organizer" | "resident";

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    role?: {
      name: UserRole;
    };
  };
}


export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};


export const login = async (identifier: string, password: string) => {
  const res = await API.post("/api/auth/local", {
    identifier,
    password,
  });

  const data: AuthResponse = res.data;

  setToken(data.jwt);
  return data;
};


export const register = async (
  username: string,
  email: string,
  password: string,
  role: UserRole
) => {
  const res = await API.post("/api/auth/local/register", {
    username,
    email,
    password,
    role, 
  });

  const data: AuthResponse = res.data;

  setToken(data.jwt);
  return data;
};



export const getCurrentUser = async () => {
  const token = getToken();

  if (!token) return null;

  try {
    const res = await API.get("/api/users/me?populate=role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    logout();
    return null;
  }
};