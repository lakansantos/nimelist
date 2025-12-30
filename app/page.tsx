import Footer from "@components/Footer";
import useGetRecommendedAnime from "@modules/Anime/Recommended/useGetRecommendedAnime";
import useGetTrendingAnime from "@modules/Anime/Trending/useGetTrendingAnime";
import Sidebar from "@components/Sidebar";
import useGetAnime from "@modules/Anime/Banner/useGetAnime";
import Navbar from "@components/Navbar";
import Anime from "@modules/Anime/Anime";

export default async function Home() {
  const {data: trendingData} = await useGetTrendingAnime();
  const {data: recommendedData} = await useGetRecommendedAnime();
  const {data: animeData} = await useGetAnime();

  const animeDataProps = {
    animeData,
    trendingData,
    recommendedData,
  };

  return (
    <div className="bg-default_blue text-white ">
      <Navbar />
      <div className="relative min-h-[calc(100vh-10%)] p-5 flex md:flex-row flex-col gap-5">
        <Sidebar />
        <Anime {...animeDataProps} />
      </div>
      <Footer />
    </div>
  );
}
