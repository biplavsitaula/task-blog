import { useEffect, useState } from "react";
import { redirect, replace } from "react-router";
import { toast } from "react-toastify";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("at")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify({ username, password, expiresInMins: 120 }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        sessionStorage.setItem("at", data.accessToken);
        sessionStorage.setItem("rt", data.refreshToken);
        return data;
      }
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

   const logout = (navigate) => {
    setLoading(true);
    try {
      setUser(null); 
      sessionStorage.clear(); 
      if (navigate) navigate("/", { replace: true }); 
    } catch (error) {
      toast.error("Error during logout.");
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return { loading, login, logout, isAuthenticated, user };
}
export default useAuth;
