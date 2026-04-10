import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/services";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((response) => setUser(response.data.data))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  const saveSession = (payload) => {
    localStorage.setItem("token", payload.token);
    setToken(payload.token);
    setUser(payload.user);
  };

  const login = async (values) => {
    const response = await authApi.login(values);
    saveSession(response.data.data);
    return response.data.data;
  };

  const register = async (values) => {
    const response = await authApi.register(values);
    saveSession(response.data.data);
    return response.data.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
