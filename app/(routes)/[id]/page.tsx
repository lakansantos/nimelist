import {redirect} from "next/navigation";
import Details from "@modules/Details/Details";
import {DetailsProvider} from "@modules/Details/DetailsContext";
import useGetDetail from "@modules/Details/useGetDetail";
import useGetDetailGenresbyId from "@modules/Details/useGetDetailGenresbyId";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import {TbError404} from "react-icons/tb";

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

  const isDataEmpty = !data || !data.attributes || data === null;

  return (
    <div className="bg-default_blue">
      <Navbar />
      {isDataEmpty ? (
        <div className="h-[80vh] flex flex-col justify-center items-center text-white gap-3">
          <TbError404 className="text-5xl" />
          <span>No results found</span>
        </div>
      ) : (
        <>
          <DetailsProvider anime={data} genres={genreData ?? null}>
            <Details />
          </DetailsProvider>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Page;
