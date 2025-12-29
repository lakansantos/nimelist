import React from "react";

const RecommendedDetailPage = ({id}: {id: number}) => {
  return (
    <div className="relative min-h-[calc(100vh-10%)] bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
      Test {id}
    </div>
  );
};

export default RecommendedDetailPage;
