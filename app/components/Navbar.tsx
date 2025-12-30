"use client";
import React from "react";
import SearchBar from "@modules/Search/SearchBar";
import Link from "next/link";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({top: 0});
}

const Navbar = () => {
  return (
    <div className="navbar bg-default_light sticky top-0 z-[101] h-[80px]">
      <ul className="flex flex-row justify-between h-full p-5">
        <li className="self-center">
          <Link href="/" scroll={false}>
            <button
              onClick={scrollToTop}
              className="text-5xl w-[50px] md:w-[80px]"
            >
              L
            </button>
          </Link>
        </li>
        <li className="">
          <SearchBar />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
