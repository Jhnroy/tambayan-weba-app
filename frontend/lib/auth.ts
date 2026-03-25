import API from "./api";

export const getMe = async () => {
  const res = await API.get("/api/users/me?populate=*");
  return res.data;
};