import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ must match backend
  timeout: 10000, // ✅ prevent hanging requests
});

// ==================================
// ADD TOKEN AUTOMATICALLY (FIXED)
// ==================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==================================
// GLOBAL RESPONSE ERROR HANDLING
// ==================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized – token expired or invalid");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

// ==================================
// ORDER APIs (UNCHANGED)
// ==================================
export const createOrderApi = (orderData) =>
  api.post("/orders", orderData);

export const getOrdersApi = () =>
  api.get("/orders");

export const getOrderByIdApi = (orderId) =>
  api.get(`/orders/${orderId}`);

export const cancelOrderApi = (orderId) =>
  api.put(`/orders/cancel/${orderId}`);

export default api;
