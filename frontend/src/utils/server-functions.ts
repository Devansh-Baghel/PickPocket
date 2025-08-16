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

interface GetSavesInput {
  userId: string
  page?: number
  limit?: number
  search?: string
}

interface GetSavesResponse {
  page: number
  limit: number
  data: Array<{
    save: {
      id: string
      made_by: string
      is_archived: boolean
      is_favorite: boolean
      is_read: boolean
      read_at?: string
      article_id: string
      timestamp: string
    }
    article: {
      id: string
      url: string
      title: string
      excerpt: string
      lang: string
      publishedTime?: string
      siteName: string
      timestamp: string
    }
  }>
}

export const getSaves = createServerFn({ method: "GET" })
  .validator((input: GetSavesInput) => input)
  .handler(async ({ data }) => {
    const { userId, page = 1, limit = 10, search } = data;

    console.log(userId, page, limit)

    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    // Make the API request to your backend
    const response = await axiosInstance
      .get(`/saves/${userId}?${params}`)
      .catch((error) => {
        throw new Error(`Failed to fetch saves: ${response.status}`);
      });

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

export const postSave = createServerFn({
  method: "POST",
})
  .validator((data: { userId: string; url: string }) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.post(`/saves/${data.userId}`, {
      url: data.url,
    });
    return response.data;
  });

export const importPocketData = createServerFn({
  method: "POST",
})
  .validator((data: { userId: string; csvContent: string }) => data)
  .handler(async ({ data }) => {
    const response = await axiosInstance.post(`/saves/${data.userId}/import`, {
      csvContent: data.csvContent,
    });
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
