import axios from "axios";

import { UserType } from "../types";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

const Token = localStorage.getItem("bearer-token");

API.interceptors.request.use((req: any) => {
  if (Token) {
    req.headers.authorization = `Bearer ${Token}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw err.response.data;
  }
);

const urlForUsers = "/auth";

export const login = (userData: Pick<UserType, "email" | "password">) =>
  API.post(`${urlForUsers}/login`, userData);
export const register = (newUser: Omit<UserType, "id" | "token">) =>
  API.post(`${urlForUsers}/register`, newUser);
export const getProfile = () => API.get(`${urlForUsers}/profile`);
