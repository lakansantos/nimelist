import Footer from "@components/Footer";
import SearchBar from "@components/SearchBar";
import AnimeCardsContainer from "@modules/Anime/AnimeCardsContainer";
import useGetTrendingAnime from "@modules/Anime/useGetTrendingAnime";

export default async function Home() {
  const {data} = await useGetTrendingAnime();
  return (
    <>
      <div className="relative bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
        <div className="w-full md:w-[70px] md:h-[calc(100vh-40px)] flex sticky top-5">
          Navbar
        </div>
        <div className="flex flex-1 gap-5 flex-col min-h-[200px] h-fit overflow-hidden">
          <SearchBar />
          <AnimeCardsContainer
            title="Trending"
            data={data}
            orientation="horizontal"
          />
          <AnimeCardsContainer
            title="Trending"
            data={data}
            orientation="horizontal"
          />
          <AnimeCardsContainer
            title="Trending"
            data={data}
            orientation="horizontal"
          />
          <AnimeCardsContainer
            title="Trending"
            data={data}
            orientation="horizontal"
          />
          {/* <AnimeCardsContainer title="Trending"  />
          <AnimeCardsContainer title="Trending" /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
