import { createServerFn } from "@tanstack/react-start";
import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL;
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.AUTH_TOKEN}`;

export const getUsers = createServerFn({
  method: "GET",
}).handler(async () => {
  console.log("hello");
  return (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
});

export const getSaves = createServerFn({
  method: "GET",
}).handler(async () => {
  return (await axios.get("/saves")).data.data;
});