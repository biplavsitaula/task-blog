import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchUserPosts } from "../services/posts";
import { usePosts } from "../hooks/usePosts";
// import usePostUser from "../hooks/usePostUser";

export const UserPostContext = createContext(null);

export const UserPostProvider = ({ children }) => {
    const { user } = useAuth();

    const [userPost, setUserPost] = useState({
        posts: [],
        total: 0,
        limit: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) return;

        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const data = await fetchUserPosts(user?.id);
                if (!cancelled) {
                    setUserPost({
                        posts: data.posts,
                        total: data.total,
                        limit: data.limit,
                    });
                }
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => (cancelled = true);
    }, [user?.id]);

    /** CREATE */
    const createPost = async (blogData) => {
        setLoading(true);
        try {
            const res = await fetch("https://dummyjson.com/posts/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...blogData, userId: user?.id }),
            });

            const newPost = await res.json();

            setUserPost((prev) => ({
                ...prev,
                posts: [newPost, ...prev.posts],
                total: prev.total + 1,
            }));
        } catch (err) {
            console.error("Error creating post:", err);
        }
        finally {
            setLoading(false);
        }
    };

    /** UPDATE */
    const updatePost = async (id, updatedPost) => {
        setLoading(true);
        try {
            const res = await fetch(`https://dummyjson.com/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });

            const data = await res.json();

            setUserPost((prev) => ({
                ...prev,
                posts: prev.posts.map((p) => (p.id === id ? { ...p, ...data } : p)),
            }));
        } catch (err) {
            console.error("Error updating post:", err);
        } finally {
            setLoading(false);
        }
    };

    /** DELETE */
    const deletePost = async (id) => {
        setLoading(true);
        try {
            await fetch(`https://dummyjson.com/posts/${id}`, { method: "PUT" });

            setUserPost((prev) => ({
                ...prev,
                posts: prev.posts.filter((p) => p.id !== id),
                total: prev.total - 1,
            }));
        } catch (err) {
            console.error("Error deleting post:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <UserPostContext.Provider
            value={{
                data: userPost,
                loading,
                error,
                createPost,
                updatePost,
                deletePost,
            }}
        >
            {children}
        </UserPostContext.Provider>
    );
};

