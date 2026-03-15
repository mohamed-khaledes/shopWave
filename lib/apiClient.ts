import axios from "axios";
import { getToken } from "./auth";

// ─── FakeStore API base ───────────────────────────────────────────────────────
export const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ─── Internal Next.js API client ─────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally: clear session and redirect
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      import("./auth").then(({ removeToken }) => removeToken());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// ─── Product API helpers ──────────────────────────────────────────────────────
export const productsApi = {
  /** Fetch all products */
  getAll: () => fakeStoreApi.get("/products"),
  /** Fetch products by category */
  getByCategory: (category: string) =>
    fakeStoreApi.get(`/products/category/${category}`),
  /** Fetch all categories */
  getCategories: () => fakeStoreApi.get("/products/categories"),
  /** Fetch single product */
  getById: (id: number) => fakeStoreApi.get(`/products/${id}`),
};
