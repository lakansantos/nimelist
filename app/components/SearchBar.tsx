import {HiOutlineSearch} from "react-icons/hi";
import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full w-[100] max-w-full md:max-w-md absolute right-0 top-0 p-5 z-[99]">
      <div
        className="
          flex items-center gap-2
          rounded-full px-4 py-2
          bg-white
          backdrop-blur-md
          border border-white/20
"
      >
        <HiOutlineSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search anime..."
          className="
            w-full bg-transparent outline-none text-sm
            text-gray-800 placeholder-gray-500
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;
