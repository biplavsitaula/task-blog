import React, { useEffect } from "react";

function useDetails({id}) {
  const [details, setDetails] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`
        );
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }

    fetchData();
  }, []);
  return { details };
}

export default useDetails;
