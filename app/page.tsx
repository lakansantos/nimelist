import Footer from "@components/Footer";
import SearchBar from "@components/SearchBar";
import RecommendedAnime from "@modules/Anime/Recommended/RecommendedAnime";
import TrendingAnime from "@modules/Anime/Trending/TrendingAnime";
import useGetRecommendedAnime from "@modules/Anime/Recommended/useGetRecommendedAnime";
import useGetTrendingAnime from "@modules/Anime/Trending/useGetTrendingAnime";
import Navbar from "@components/Navbar";

export default async function Home() {
  const {data: trendingData} = await useGetTrendingAnime();
  const {data: recommendedData} = await useGetRecommendedAnime();

  return (
    <>
      <div className="relative bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
        <Navbar />
        <div className="flex flex-1 gap-5 flex-col min-h-[200px] h-fit overflow-hidden">
          <SearchBar />
          <TrendingAnime title="Trending" data={trendingData} />
          <RecommendedAnime
            title="Recommended for you"
            data={recommendedData}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
