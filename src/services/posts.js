export async function fetchPosts(props) {
  const { page = 1, userId } = props;
  let url;
  if (userId) {
    url = `${
      import.meta.env.VITE_BACKEND_URL
    }/posts/user/${userId}?limit=10&skip=0`;
  } else {
    url = `${import.meta.env.VITE_BACKEND_URL}/posts?limit=10&skip=${
      (page - 1) * 10
    }`;
  }

  const response = await fetch(url);

  const res = await response.json();

  if (!response.ok) throw new Error("Failed to fetch movies");

  return res;
}

export async function fetchDetails(id) {
  if (!id) throw new Error("Movie ID is required");

  const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch movie details");
  return response.json();
}
