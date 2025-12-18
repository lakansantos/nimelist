import React from "react";
import {RiGalleryView2} from "react-icons/ri";
import {FaBookmark} from "react-icons/fa";
import {RxAvatar} from "react-icons/rx";

const Navbar = () => {
  return (
    <div
      className="
    w-full bg-default_light 
    flex items-center justify-between 
    rounded-xl md:w-[70px] md:h-[calc(100vh-50vh)] 
    flex  top-5
    p-5
    gap-3
    z-[100]
    flex-row 
    md:flex-col 
    sticky
    "
    >
      <div className="logo-container mb-0 md:mb-6 text-4xl flex justify-center items-center">
        L
      </div>
      <ul className="option-container flex flex-row md:flex-col justify-center items-center md:justify-start md:items-start flex-1 gap-3">
        <li>
          <RiGalleryView2 className="text-2xl" />
        </li>
        <li>
          <FaBookmark className="text-2xl" />
        </li>
      </ul>
      <div className="avatar-container">
        <RxAvatar className="text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
