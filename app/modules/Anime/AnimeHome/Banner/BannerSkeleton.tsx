import cx from "classnames";

const BannerSkeleton = ({load}: {load: boolean}) => {
  return (
    <div
      className={cx(
        "relative h-[55vh] overflow-hidden rounded-lg bg-default_blue animate-pulse",
        {
          hidden: load,
          flex: !load,
        }
      )}
    >
      {/* fake background */}
      <div className="absolute inset-0 bg-gray-700/40" />

      {/* fake overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* fake fade bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[32px] z-20 bg-gradient-to-t from-default_blue to-transparent" />

      {/* content */}
      <div className="relative z-30 h-full flex flex-col justify-center pb-[40px] p-5 w-full">
        {/* title */}
        <div className="h-12 md:h-20 max-w-[100%] lg:max-w-[50%] bg-gray-500/40 rounded mb-4" />

        {/* meta row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-4 w-16 bg-gray-500/40 rounded" />
          <div className="h-4 w-4 bg-gray-500/40 rounded-full" />
          <div className="h-4 w-24 bg-gray-500/40 rounded" />
          <div className="h-4 w-4 bg-gray-500/40 rounded-full" />
          <div className="h-4 w-20 bg-gray-500/40 rounded" />
        </div>

        {/* description */}
        <div className="space-y-2 max-w-full w-full md:max-w-[50%]">
          <div className="h-4 bg-gray-500/40 rounded w-full " />
          <div className="h-4 bg-gray-500/40 rounded w-[95%]" />
          <div className="h-4 bg-gray-500/40 rounded w-[90%]" />
          <div className="h-4 bg-gray-500/40 rounded w-[80%]" />
        </div>

        {/* button */}
        <div className="mt-5">
          <div className="h-10 w-32 bg-gray-500/40 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
