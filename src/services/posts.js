export async function fetchPosts({ page = 1, search = "" }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const params = new URLSearchParams({
    page: String(page),
   skip: (page - 1) * 10,
  });

  let url;

  if (search.trim() !== "") {
    params.append("q", search.trim());
    url = `${baseUrl}/posts/search?${params.toString()}`;
  } else {
    url = `${baseUrl}/posts?${params.toString()}`;
  }

  const response = await fetch(url);
  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message || "Failed to fetch posts");
  }

  return res;
}

export async function fetchDetails(id) {
  if (!id) throw new Error("Movie ID is required");

  const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch movie details");
  return response.json();
}

export async function fetchUserPosts(userId) {
  if (!userId) throw new Error("User ID is required");
  const url = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${userId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch user posts");
  return response.json();
}
