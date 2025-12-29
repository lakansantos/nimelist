import {HiOutlineSearch} from "react-icons/hi";
import {IoClose} from "react-icons/io5";
import React from "react";
import Image from "next/image";
import {extractYear} from "@utils/dates";
import useSearch from "./useSearch";

const SearchBar = () => {
  const {
    wrapperRef,
    clearSearch,
    results,
    query,
    isOpen,
    hasMore,
    loading,
    setQuery,
    setIsOpen,
    observerRef,
  } = useSearch();

  return (
    <div
      ref={wrapperRef}
      className="w-full max-w-md absolute right-0 top-0 p-5 z-[99]"
    >
      {/* Search Input */}
      <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-white border border-white/20">
        <HiOutlineSearch className="text-gray-500 text-xl" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search anime..."
          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <IoClose size={18} />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && query && (
        <div className="mt-2 max-h-[400px] overflow-y-auto rounded-lg bg-white shadow-md">
          {results.map((anime) => {
            const {titles, startDate, posterImage} = anime.attributes;

            return (
              <a
                key={anime.id}
                href={`/${anime.id}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
              >
                <div className="relative w-12 h-16 shrink-0 rounded overflow-hidden">
                  <Image
                    src={posterImage.small || posterImage.original}
                    alt={titles.en ?? "anime"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {titles.en_us ?? titles.en ?? titles.en_jp ?? "Untitled"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {startDate ? extractYear(startDate) : "—"}
                  </span>
                </div>
              </a>
            );
          })}

          {hasMore && (
            <div
              ref={observerRef}
              className="p-4 text-center text-sm text-gray-400"
            >
              {loading ? "Loading..." : "Scroll to load more"}
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
