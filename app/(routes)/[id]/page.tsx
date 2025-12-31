import {redirect} from "next/navigation";
import Details from "@modules/Details/Details";
import useGetDetail from "@modules/Details/useGetDetail";
import useGetDetailGenresbyId from "@modules/Details/useGetDetailGenresbyId";
import Navbar from "@components/Navbar";

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({params}: PageProps) => {
  const {id} = params;

  // check if id is NOT a number
  const isNotNumber = Number.isNaN(Number(id));

  if (!id || isNotNumber) {
    if (isNotNumber) {
      redirect("/");
    }
  }

  const {data} = await useGetDetail(id);
  const {data: genreData} = await useGetDetailGenresbyId(id);

  const propsData = {data, genreData};

  return (
    <div className="bg-default_blue">
      <Navbar />
      <Details {...propsData} />
    </div>
  );
};

export default Page;
