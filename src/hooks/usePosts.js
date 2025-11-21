import { useEffect, useState } from "react";
import { fetchPosts } from "../services/posts";
import { useLocation } from "react-router";

function usePosts({ page = 1, userId = null } = {}) {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setLoading(true);
      try {
        let data = null;
        if (location.pathname === "/") {
          data = await fetchPosts({ page });
        } else {
          data = await fetchPosts({ page, userId });
        }

        if (!isCancelled) {
          setTotalPages(Math.ceil(data.total / data?.limit));
          setPosts(data);
        }
      } catch (err) {
        if (!isCancelled) setError(err);
      } finally {
         setLoading(false);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [page, userId]);

  const createPost = async (blogData) => {
    try {
      const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("at")}`,
        },
        body: JSON.stringify({ ...blogData, userId }),
      });
      const data = await res.json();
      setPosts({ ...posts, posts: [data, ...posts.posts] });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const res = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });
      const data = await res.json();
      setPosts({
        ...posts,
        posts: posts.posts.map((post) =>
          post.id === id ? { ...post, ...data } : post
        ),
      });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`https://dummyjson.com/posts/${id}`, { method: "PUT" });
      setPosts({
        ...posts,
        posts: posts.posts.filter((p) => p.id !== id),
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return {
    data: posts,
    loading,
    error,
    totalPages,
    createPost,
    updatePost,
    deletePost,
  };
}

export default usePosts;
