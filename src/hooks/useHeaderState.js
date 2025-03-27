import { useState } from "react";

export function useHeaderState() {
  const [query, setQuery] = useState("");

  function handleSearch(event) {
    setQuery(event.target.value.toLowerCase());
  }

  return {
    query,
    handleSearch,
  };
}
