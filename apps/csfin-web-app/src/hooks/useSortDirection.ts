import { SortDirection } from "@csfin-monorepo/core";
import { useState } from "react";

export const useSortDirection = (initialDirection?: SortDirection) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    initialDirection ?? "asc"
  );

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return { sortDirection, toggleSortDirection };
};
