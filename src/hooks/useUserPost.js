import { useContext } from "react";
import { UserPostContext } from "../contexts/UserPostContext";

export const useUserPost = () => {
  const ctx = useContext(UserPostContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
};
