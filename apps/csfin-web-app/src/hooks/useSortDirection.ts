import { useState } from "react";

type SortDirection = "asc" | "desc";

const useSortDirection = (initialValue?: SortDirection) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    initialValue ?? "asc"
  );

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return { sortDirection, toggleSortDirection };
};

export default useSortDirection;
