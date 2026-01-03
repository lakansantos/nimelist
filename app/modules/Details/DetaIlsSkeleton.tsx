"use client";

import React from "react";

const DetailsSkeleton = () => {
  return (
    <div className="relative min-h-screen h-fit bg-default_blue text-white flex md:flex-row flex-col gap-5 animate-pulse">
      <div className="w-full flex flex-col">
        {/* Banner */}
        <div className="relative w-full h-[25vh] md:h-[35vh] bg-gray-800 rounded-md mb-5" />

        {/* Main content */}
        <div className="main-container flex flex-col md:flex-row p-5 gap-5">
          {/* LEFT: Poster + Details */}
          <div className="w-full md:w-[300px] flex flex-col gap-5">
            {/* Poster */}
            <div className="relative h-[200px] w-full bg-gray-700 rounded-md" />

            {/* Stats */}
            <div className="flex flex-col gap-4">
              {Array.from({length: 6}).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-600 rounded-full" />
                  <div className="h-4 w-24 bg-gray-600 rounded-md" />
                  <div className="flex-1 h-4 bg-gray-700 rounded-md" />
                </div>
              ))}
            </div>

            {/* Genres */}
            <div className="flex gap-2 flex-wrap">
              {Array.from({length: 3}).map((_, idx) => (
                <div key={idx} className="h-6 w-16 bg-gray-600 rounded-full" />
              ))}
            </div>

            {/* Button */}
            <div className="h-12 w-full bg-gray-600 rounded-md" />
          </div>

          {/* RIGHT: Content */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Title */}
            <div className="h-8 w-1/2 bg-gray-600 rounded-md mb-2" />

            {/* Synopsis */}
            <div className="flex flex-col gap-2">
              <div className="h-6 w-24 bg-gray-600 rounded-md" />
              {Array.from({length: 5}).map((_, idx) => (
                <div key={idx} className="h-4 w-full bg-gray-700 rounded-md" />
              ))}
            </div>

            {/* Other Details */}
            <div className="flex flex-col gap-2 mt-5">
              <div className="h-6 w-32 bg-gray-600 rounded-md" />
              <div className="grid grid-cols-3 gap-3">
                {Array.from({length: 6}).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-12 w-full bg-gray-700 rounded-md"
                  />
                ))}
              </div>
            </div>

            {/* Trailer */}
            <div className="mt-5 h-[315px] w-full lg:w-1/2 bg-gray-800 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
