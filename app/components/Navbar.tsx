"use client";
import React from "react";
import SearchBar from "@modules/Search/SearchBar";
import Link from "next/link";
import Image from "next/image";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({top: 0});
}

const Navbar = () => {
  return (
    <div className="navbar bg-default_light/80 sticky top-0 z-[101] backdrop-blur-md text-white h-[80px]">
      <ul className="flex flex-row justify-between h-full p-5">
        <li className="self-center h-[70px]">
          <Link href="/" scroll={false}>
            <button
              onClick={scrollToTop}
              className="h-full w-[50px] flex justify-center items-center h-[70px] md:w-[80px]"
            >
              <Image
                src="/hat.png"
                width={100}
                height={100}
                className=" w-[60px] h-full "
                alt="hat logo"
                priority
              />
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
