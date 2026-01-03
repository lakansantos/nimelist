import {redirect} from "next/navigation";
import Details from "@modules/Details/Details";
import {DetailsProvider} from "@modules/Details/DetailsContext";
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

  if (!id || Number.isNaN(Number(id))) {
    redirect("/");
  }

  const {data} = await useGetDetail(id);
  const {data: genreData} = await useGetDetailGenresbyId(id);

  if (!data || !data.attributes || data === null) {
    return "No Data";
  }
  return (
    <div className="bg-default_blue">
      <Navbar />
      <DetailsProvider anime={data} genres={genreData ?? null}>
        <Details />
      </DetailsProvider>
    </div>
  );
};

export default Page;
