import { createContext, useContext, useEffect, useState } from "react";
import { fetchPosts } from "../services/posts";
import { useSearchParams } from "react-router";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [params, setParams] = useSearchParams("");

  const search = params.get("search") || "";
  const page = Number(params.get("page")) || 1;

  const handleSearch = (newQuery) => {
    const newParams = new URLSearchParams();
    if (newQuery) newParams.set("search", newQuery);
    setParams(newParams);
  };

  const handlePageChange = (newPage) => {

    const newParams = new URLSearchParams();
    if (newPage > 1) newParams.set("page", newPage);
    setParams(newParams);
  };

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    async function load() {
      try {
        const data = await fetchPosts({ page, search });

        if (!isCancelled) {
          setTotalPages(Math.ceil(data.total / data?.limit));
          setPosts(data);
        }
      } catch (err) {
        if (!isCancelled) setError(err);
      } finally {
        if (!isCancelled)
          setLoading(false);
      }
    }
    load();

    return () => {
      isCancelled = true;
    };
  }, [params]);

  console.log(page);




  return (
    <PostContext.Provider
      value={{
        data: posts,
        setPosts,
        loading,
        error,
        totalPages,
        handlePageChange,
        handleSearch,
        page,
        search
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

