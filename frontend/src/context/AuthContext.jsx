"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { jwtDecode } from "jwt-decode" // Import jwt-decode
import { api } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken) // Decode the token
        setUser({ ...decodedToken, token: accessToken }) // Set user details from the token
      } catch (error) {
        console.error("Error decoding token:", error)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await api.post("/api/token/", { username, password })
      const { access, refresh } = response.data

      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)

      const decodedToken = jwtDecode(access) // Decode the token
      setUser({ ...decodedToken, token: access }) // Set user details from the token

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (refreshToken) {
        await api.post(
          "/api/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        )
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}