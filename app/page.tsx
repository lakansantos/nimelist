import Footer from "@components/Footer";
import AnimeCardsContainer from "@modules/Anime/AnimeCardsContainer";

export default async function Home() {
  return (
    <>
      <div className="relative bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
        <div className="w-full  border md:w-[70px]  md:h-[calc(100vh-40px)] flex sticky top-5">
          Navbar
        </div>
        <div className="flex flex-1 gap-5 flex-col border border-red-500 min-h-[200px] h-fit overflow-auto">
          Anime containers
          <AnimeCardsContainer title="Trending" orientation="horizontal" />
          <AnimeCardsContainer title="Trending" orientation="horizontal" />
          <AnimeCardsContainer title="Trending" orientation="horizontal" />
        </div>
      </div>
      <Footer />
    </>
  );
}
