"use client";
import React from "react";
import {FaBookmark} from "react-icons/fa";
import {MdLocalFireDepartment} from "react-icons/md";
import {IoHome} from "react-icons/io5";
import classNames from "classnames";

const navItems = [
  {label: "Home", icon: IoHome},
  {label: "Trending", icon: MdLocalFireDepartment},
  {label: "Saved", icon: FaBookmark},
];

const ITEM_WIDTH = 80;
const ITEM_HEIGHT = 100;

type SidebarProps = {
  mounted: boolean;
  isDesktop: boolean;
  current: number;
  setCurrent: (current: number) => void;
};

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({top: 0});
}

const Sidebar = ({mounted, isDesktop, current, setCurrent}: SidebarProps) => {
  return (
    <div
      className="
      w-full bg-default_light
      flex items-center justify-between
      rounded-xl md:w-[80px] md:h-fit
      top-[100px]
      gap-3 z-[100]
      flex-row md:flex-col
      sticky
    "
    >
      <ul
        className="
        relative option-container
        flex flex-row md:flex-col
        justify-center items-center
        md:justify-start md:items-start
        flex-1
      "
      >
        {/* Sliding indicator */}
        {mounted && (
          <span
            className="
      absolute bg-default_lightest rounded-xl
      transition-transform duration-300 ease-out
      w-[80px] h-[100px]
    "
            style={{
              transform: isDesktop
                ? `translateY(${current * ITEM_HEIGHT}px)`
                : `translateX(${current * ITEM_WIDTH - ITEM_WIDTH}px)`,
            }}
          />
        )}

        {navItems.map(({label, icon: Icon}, index) => (
          <li
            key={label}
            onClick={() => {
              if (index === 0) {
                scrollToTop();
              }
              setCurrent(index);
            }}
            className="
    relative z-10
    flex items-center flex-col justify-center
    w-[80px] p-5 gap-2 cursor-pointer
  "
          >
            <Icon
              className={classNames("text-3xl transition-all duration-300", {
                "text-white scale-110": current === index,
                "text-gray-400": current !== index,
              })}
            />
            <p className="font-thin text-sm">{label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
