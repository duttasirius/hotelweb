import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const TOKEN_KEY = "hotel_auth_token";

const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const saveAuth = (nextToken, nextUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  };

  const apiRequest = useMemo(
    () =>
      async (config) => {
        const activeToken = token || getStoredToken();
        return axios({
          ...config,
          headers: {
            ...(config.headers || {}),
            ...(activeToken
              ? { Authorization: `Bearer ${activeToken}` }
              : {}),
          },
        });
      },
    [token],
  );

  const login = async (email, password) => {
    const { data } = await axios.post("/api/auth/login", { email, password });

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    saveAuth(data.token, data.user);
    return data.user;
  };

  const register = async ({ username, email, password }) => {
    const { data } = await axios.post("/api/auth/register", {
      username,
      email,
      password,
    });

    if (!data.success) {
      throw new Error(data.message || "Registration failed");
    }

    saveAuth(data.token, data.user);
    return data.user;
  };

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const storedToken = getStoredToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (mounted && data.success) {
          setToken(storedToken);
          setUser(data.user);
        }
      } catch (error) {
        console.error("SESSION RESTORE ERROR:", error);
        if (mounted) clearAuth();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout: clearAuth,
      setUser,
      apiRequest,
      getToken: async () => token || getStoredToken(),
    }),
    [apiRequest, loading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
