"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication when the application loads.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (credentials) => {
    await loginService(credentials);

    const response = await getCurrentUser();

    setUser(response.data);

    return response.data;
  };

  // Logout
  const logout = async () => {
    await logoutService();

    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
