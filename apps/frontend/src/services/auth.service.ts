import axiosAnsence from "../api/api.config";
import { endpoints } from "../api/endpoints";
import type { IUser } from "../types/user.type";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  const response = await axiosAnsence.post(endpoints.auth.login, data);

  return response.data.access_token;
};

export const register = async (data: {
  email: string;
  username: string;
  password: string;
}): Promise<string> => {
  const response = await axiosAnsence.post(endpoints.auth.register, data);

  return response.data.access_token;
};


export const me = async() : Promise<IUser> =>{
  const res = await axiosAnsence.get(endpoints.auth.me);
  return res.data
}