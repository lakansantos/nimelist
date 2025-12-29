import RecommendedDetailPage from "@modules/Details/Recommended/Recommended";
import React from "react";
import {redirect} from "next/navigation";
import useGetRecommendedDetailById from "@modules/Details/Recommended/useGetRecommendedDetailById";

const DetailPage = async ({params}: {params: {id: string}}) => {
  const {id} = params;

  // check if id is NOT a number
  const isNotNumber = Number.isNaN(Number(id));

  if (!id || isNotNumber) {
    if (isNotNumber) {
      redirect("/");
    }
  }

  const {data} = await useGetRecommendedDetailById(id);

  return <RecommendedDetailPage data={data} />;
};

export default DetailPage;
