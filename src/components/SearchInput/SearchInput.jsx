import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchValue}
      onChange={handleChange}
    />
  );
};
export default SearchInput;
