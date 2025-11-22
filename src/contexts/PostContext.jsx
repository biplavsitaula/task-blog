import { createContext, useContext, useEffect, useState } from "react";
import { fetchPosts } from "../services/posts";

export const PostContext = createContext(null);

export const PostProvider = ({page=1, children }) => {
 const [posts, setPosts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
      let isCancelled = false;
      setLoading(true);
  
      async function load() {
        try {
          const data = await fetchPosts({ page });
  
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
    }, [page]);



  return (
    <PostContext.Provider
      value={{
        data: posts,
        loading,
        error,
        totalPages
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

