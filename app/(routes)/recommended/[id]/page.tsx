import RecommendedDetailPage from "@modules/Details/Recommended/Recommended";
import React from "react";
import {redirect} from "next/navigation";
import useGetRecommendedDetailById from "@modules/Details/Recommended/useGetRecommendedDetailById";
import Navbar from "@components/Navbar";

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

  return (
    <div className="bg-default_blue">
      <Navbar />
      <RecommendedDetailPage data={data} />
    </div>
  );
};

export default DetailPage;
