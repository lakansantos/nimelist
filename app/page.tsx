import Footer from "@components/Footer";
import RecommendedAnime from "@modules/Anime/Recommended/RecommendedAnime";
import TrendingAnime from "@modules/Anime/Trending/TrendingAnime";
import useGetRecommendedAnime from "@modules/Anime/Recommended/useGetRecommendedAnime";
import useGetTrendingAnime from "@modules/Anime/Trending/useGetTrendingAnime";
import Navbar from "@components/Navbar";
import Banner from "@modules/Anime/Banner/Banner";
import useGetAnime from "@modules/Anime/Banner/useGetAnime";

export default async function Home() {
  const {data: trendingData} = await useGetTrendingAnime();
  const {data: recommendedData} = await useGetRecommendedAnime();
  const {data: animeData} = await useGetAnime();

  return (
    <>
      <div className="relative bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
        <Navbar />
        <div className="flex flex-1 gap-5 flex-col min-h-[200px] h-fit overflow-hidden">
          <Banner data={animeData} />
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
