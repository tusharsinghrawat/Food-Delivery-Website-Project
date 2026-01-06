import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

// Create context
const AuthContext = createContext(undefined);

// 🔹 helper: check token expiry
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==================================
  // INIT AUTH FROM LOCALSTORAGE
  // ==================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("foodapp_user");

    if (token && savedUser && !isTokenExpired(token)) {
      try {
        setUser(JSON.parse(savedUser));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch {
        localStorage.removeItem("foodapp_user");
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      localStorage.removeItem("foodapp_user");
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  // ===============================
  // LOGIN ✅ FINAL
  // ===============================
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "foodapp_user",
        JSON.stringify(res.data.user)
      );

      api.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;

      setUser(res.data.user);
      return true; // ✅ ONLY TRUE
    } catch (error) {
      console.error(
        "Login failed:",
        error?.response?.data?.message || error
      );
      return false; // ✅ ONLY FALSE
    }
  };

  // ===============================
  // SIGNUP ✅ FINAL
  // ===============================
  const signup = async (name, email, password) => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // save email for login autofill
      localStorage.setItem("last_signup_email", email);
      return true; // ✅ ONLY TRUE
    } catch (error) {
      console.error(
        "Signup failed:",
        error?.response?.data?.message || error
      );
      return false; // ✅ ONLY FALSE
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    setUser(null);
    localStorage.removeItem("foodapp_user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
