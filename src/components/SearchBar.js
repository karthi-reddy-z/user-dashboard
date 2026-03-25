import { useEffect, useState } from "react";

function SearchBar({ setSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value);
    }, 400);
    return () => clearTimeout(timer);
  }, [value, setSearch]);

  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchBar;