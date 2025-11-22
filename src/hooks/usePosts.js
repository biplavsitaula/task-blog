import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export const usePosts = () => {
  const ctx = useContext(PostContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
};
