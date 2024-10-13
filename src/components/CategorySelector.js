import React from "react";

const categories = ["Electronic", "Clothes", "Grocery", "Cosmetics", "Medicine", "Other"];

const CategorySelector = ({ selectedCategory, onSelectCategory, theme }) => {
  return (
    <div className="max-w-screen-xl flex justify-center mt-4 mx-4 sm:mx-6 md:mx-8 lg:mx-10 gap-3 flex-wrap transition-colors duration-300 ease-in-out">
      {categories.map((category) => (
        <button
          key={category}
          className={`py-1 px-2 sm:py-2 sm:px-3 md:py-2 md:px-4 rounded-md transition-all duration-300 ease-in-out
            ${selectedCategory === category
              ? "bg-blue-500 text-white"
              : theme === "dark"
              ? "bg-gray-700 text-gray-300 hover:bg-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
          onClick={() => onSelectCategory(category)}
        >
          <span className="text-xs sm:text-sm md:text-base">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
