// authRoutes.js
import { redirect } from "react-router";

export const requireAuth = async () => {
  const at = sessionStorage.getItem("at");
  if (!at) {
    return redirect("/login");
  }
  return null;
};

export const redirectIfAuth = async () => {
  const at = sessionStorage.getItem("at");
  if (at) {
    return redirect("/dashboard");
  }
  return null;
};
