import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function readTokenFromDocumentCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = readTokenFromDocumentCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
