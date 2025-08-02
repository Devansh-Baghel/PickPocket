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
})
  .validator((data: string) => data)
  .handler(async ({ data: userId }) => {
    const response = await axiosInstance.get(`/saves/${userId}`);
    return response.data;
  });

export const getSaveWithArticle = createServerFn({
  method: "GET",
})
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.get(`/articles/save/${data}`);
    return response.data;
  });

// Profile Statistics Server Function
export const getProfileStats = createServerFn({
  method: "GET",
})
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.get(`/profile/${data.userId}/stats`);
    return response.data;
  });

// Profile Preferences Server Function
export const getProfilePreferences = createServerFn({
  method: "GET",
})
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.get(`/profile/${data.userId}/preferences`);
    return response.data;
  });

// Update Profile Preferences Server Function
export const updateProfilePreferences = createServerFn({
  method: "POST",
})
  .validator((data: {
    userId: string;
    preferences: {
      autoArchive: boolean;
      emailNotifications: boolean;
      readingReminders: boolean;
    };
  }) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.put(`/profile/${data.userId}/preferences`, data.preferences);
    return response.data;
  });

// Update Profile Information Server Function
export const updateProfile = createServerFn({
  method: "POST",
})
  .validator((data: {
    userId: string;
    profile: {
      name: string;
      email: string;
    };
  }) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.put(`/profile/${data.userId}`, data.profile);
    return response.data;
  });
