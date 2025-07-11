import { createServerFn } from "@tanstack/react-start";
import axios from "axios";

export const getUsers = createServerFn({
  method: "GET",
}).handler(async () => {
  console.log("hello");
  return (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
});