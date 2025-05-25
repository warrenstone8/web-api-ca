import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage token if exists
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return token && username ? { token, username } : null;
  });

  // Signup function
  const signup = async ({ username, password }) => {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Signup failed");
    }
    const data = await response.json();
    setUser({ token: data.token, username: data.user.username });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
  };

  // Login function
  const login = async ({ username, password }) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }
    const data = await response.json();
    setUser({ token: data.token, username: data.user.username });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
