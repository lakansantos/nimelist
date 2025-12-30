const TrendingCardSkeleton = ({cards = 5}: {cards: number}) => {
  return (
    <div className="absolute inset-0 z-30 flex flex-col min-h-[200px] max-w-full animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 w-64 bg-gray-700 rounded mb-5" />

      {/* Cards container */}
      <div className="flex flex-row gap-3 overflow-hidden">
        {Array.from({length: cards}).map((_, i) => (
          <div
            key={i}
            className="relative h-[200px] min-w-[400px] w-[400px] rounded-lg bg-gray-800 overflow-hidden"
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text skeleton */}
            <div className="relative z-10 h-full flex flex-col justify-end p-5 gap-2">
              <div className="h-4 w-32 bg-gray-600 rounded" />
              <div className="h-6 w-3/4 bg-gray-600 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCardSkeleton;
