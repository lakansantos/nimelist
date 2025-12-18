"use client";
import {Anime} from "@app-types/anime";
import cx from "classnames";
import Image from "next/image";
import React, {ReactNode, useRef, useState} from "react";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";

type AnimeCardsContainerProps = {
  data: Anime[];
  title: string;
  orientation: "horizontal" | "vertical";
};

type ScrollerButtonProps = {
  children: ReactNode;
  onClick: () => void;
  visible?: boolean;
  direction: "left" | "right";
};

const ScrollerButton = ({
  children,
  direction,
  onClick,
  visible = true,
}: ScrollerButtonProps) => {
  const buttonClass = cx(
    "text-white bg-gray-800/80 px-5 py-2 absolute top-auto z-50 bottom-auto h-[200px] w-auto flex justify-start items-center opacity-0 hover:opacity-100 duration-700 max-md:hidden group-hover:opacity-100",
    {
      "left-100": direction === "left",
      "right-0": direction === "right",
      hidden: !visible,
    }
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

const AnimeCardsContainer = ({
  data,
  title,
  orientation,
}: AnimeCardsContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    setClicked(true);

    if (containerRef.current) {
      if (direction === "left") {
        setScroll((containerRef.current.scrollLeft -= 750));
      } else {
        setScroll((containerRef.current.scrollLeft += 750));
      }
    }
  };

  const [clicked, setClicked] = useState(false);
  const [scroll, setScroll] = useState(0);

  return (
    <div className="min-h-[200px] w-fit flex flex-col  min-h-[200px] max-w-full ">
      <h2 className="text-3xl text-white mb-5">{title}</h2>
      {orientation === "horizontal" ? (
        <div className="relative group">
          {clicked && scroll > 0 ? (
            <ScrollerButton
              onClick={() => handleScroll("left")}
              direction="left"
              visible={scroll > 0} // optional prop to show/hide
            >
              <HiOutlineChevronLeft style={{fontSize: "30px", float: "left"}} />
            </ScrollerButton>
          ) : null}

          <ScrollerButton
            onClick={() => handleScroll("right")}
            direction="right"
          >
            <HiOutlineChevronRight style={{fontSize: "30px", float: "left"}} />
          </ScrollerButton>
          <div
            ref={containerRef}
            className="cards-container overflow-auto flex flex-row gap-3 scroll-smooth"
          >
            {data.map((item) => (
              <Image
                key={item.id}
                height={250}
                width={450}
                priority={true}
                className="h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg"
                src={item.attributes.coverImage.original}
                alt={`${item.attributes.titles.en} image`}
              />
            ))}

            {/* <button className="text-white bg-gray-800/80 px-5 py-2 rounded absolute top-auto z-50  bottom-auto h-[200px] w-auto right-0 flex justify-start items-center opacity-0 hover:opacity-100 duration-700 max-md:hidden"></button> */}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          {data.map((item) => (
            <Image
              key={item.id}
              height={250}
              width={500}
              priority={true}
              className="h-[200px] w-[400px] object-cover"
              src={item.attributes.coverImage.original}
              alt={`${item.attributes.titles.en} image`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeCardsContainer;
