// Dashboard.jsx
import { useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";
import { useUserPost } from "../hooks/useUserPost";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, createPost, updatePost, deletePost } = useUserPost({ userId: user?.id });

  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: "", body: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(editingPost.id, form);
    } else {
      createPost(form);
    }
    setForm({ title: "", body: "" });
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditingPost(post);
    setForm({ title: post.title, body: post.body });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
        >
          {editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>

      <h2 className="my-4 py-2 font-bold border-t">My Blogs</h2>

      {!data?.posts?.length > 0 && !loading && <p>No posts available.</p>}

      {loading && (
        <p>Loading posts...</p>
      )}
      {!loading && (
        <ul>
          {data && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {data?.posts?.map(post => (
              <li key={post.id} className="card-wrap rounded-lg" >

                {post && <><PostCard post={post} />
                  <div className="flex justify-end gap-4 pr-6 mt-2">
                    <button onClick={() => handleEdit(post)}
                      className="text-sm cursor-pointer text-blue-500 mb-2">Edit</button>
                    <button onClick={() => deletePost(post.id)} className="text-sm cursor-pointer text-red-500 mb-2 ml-2">Delete</button>
                  </div>
                </>
                }
              </li >
            ))}
          </div>}
        </ul>
      )}
    </div>
  );
}
