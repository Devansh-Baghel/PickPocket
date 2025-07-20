import { createServerFn } from "@tanstack/react-start";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  },
});

export const getUsers = createServerFn({
  method: "GET",
}).handler(async () => {
  console.log("hello");
  return (await axiosInstance.get("https://jsonplaceholder.typicode.com/users"))
    .data;
});

export const getSaves = createServerFn({
  method: "GET",
}).handler(async () => {
  return (await axiosInstance.get("/saves")).data.data;
});
