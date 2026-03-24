import { RegisterPayload } from "@/types";
import instance from "@/utils/axios";

export const register = async (payload: RegisterPayload) => {
    const res = await instance.post(`/tasks`, {
    data: payload,
  });
  return res.data;
}