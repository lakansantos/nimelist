import React from "react";
import {MdLocalFireDepartment} from "react-icons/md";

const AnimeTrendingBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#020617] border border-white/10">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative px-6 py-8 md:px-10 md:py-12">
        <div className="flex items-center gap-3 mb-2">
          <MdLocalFireDepartment className="text-orange-500 text-3xl" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Trending Anime
          </h1>
        </div>

        <p className="text-sm md:text-base text-white/60 max-w-xl">
          Updated regularly based on popularity and viewer activity.
        </p>
      </div>
    </div>
  );
};

export default AnimeTrendingBanner;
