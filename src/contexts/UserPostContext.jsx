import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchUserPosts } from "../services/posts";
// import usePostUser from "../hooks/usePostUser";

export const UserPostContext = createContext(null);

export const UserPostProvider = ({ children }) => {
    const { user } = useAuth();

    const [posts, setPosts] = useState({
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
                    setPosts({
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
        try {
            const res = await fetch("https://dummyjson.com/posts/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...blogData, userId: user?.id }),
            });

            const newPost = await res.json();

            setPosts((prev) => ({
                ...prev,
                posts: [newPost, ...prev.posts],
                total: prev.total + 1,
            }));
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    /** UPDATE */
    const updatePost = async (id, updatedPost) => {
        try {
            const res = await fetch(`https://dummyjson.com/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });

            const data = await res.json();

            setPosts((prev) => ({
                ...prev,
                posts: prev.posts.map((p) => (p.id === id ? { ...p, ...data } : p)),
            }));
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    /** DELETE */
    const deletePost = async (id) => {
        try {
            await fetch(`https://dummyjson.com/posts/${id}`, { method: "PUT" });

            setPosts((prev) => ({
                ...prev,
                posts: prev.posts.filter((p) => p.id !== id),
                total: prev.total - 1,
            }));
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    return (
        <UserPostContext.Provider
            value={{
                data: posts,
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

