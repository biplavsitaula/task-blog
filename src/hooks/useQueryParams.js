import { useSearchParams } from "react-router";

function useQueryParams() {
  const [params, setParams] = useSearchParams("");

  const categoryParams = params.get("query") || "";
  const pageParams = Number(params.get("page")) || 1;

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

  return {
    categoryParams,
    pageParams,
    handleSearch,
    handlePageChange,
  };
}

export default useQueryParams;
