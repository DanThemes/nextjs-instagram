import axiosModule from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const axios = axiosModule.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
