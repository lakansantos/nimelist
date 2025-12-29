import RecommendedDetailPage from "@modules/Details/Recommended/Recommended";
import React from "react";

const DetailPage = ({params}: {params: {id: number}}) => {
  const {id} = params;
  return <RecommendedDetailPage id={id} />;
};

export default DetailPage;
