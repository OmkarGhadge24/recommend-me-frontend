import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = ({ onSearch, handler }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      if (typeof handler === "function") {
        handler();
      } else {
        console.error("Handler is not a function");
      }
    } else {
      alert("Please enter a search query.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex items-center mt-4 justify-center">
      <div className="flex w-full justify-center">
        <input
          type="text"
          className="border border-gray-300 py-2 px-4 rounded-l-md w-60 sm:w-60 md:w-80 lg:w-96 focus:outline-none focus:ring-0"
          placeholder="Search for a product"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600"
        >
          <HiOutlineSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
