import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          window.location.href = "/login"
          return Promise.reject(error)
        }

        // Aquí se refresca el token
        const response = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh: refreshToken,
        })

        localStorage.setItem("accessToken", response.data.access)
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export const userService = {
  getAll: () => api.get("/api/users/"),
  getById: (id) => api.get(`/api/users/${id}/`),
  create: (data) => api.post("/api/users/", data),
  update: (id, data) => api.put(`/api/users/${id}/`, data),
  partialUpdate: (id, data) => api.patch(`/api/users/${id}/`, data),
  delete: (id) => api.delete(`/api/users/${id}/`),
}

export const attentionPointService = {
  getAll: () => api.get("/api/attention-points/"), // Asegúrate de que esta ruta coincida con tu backend
}

export const ticketService = {
  getAll: () => api.get("/api/tickets/")
}