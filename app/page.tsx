import Footer from "@components/Footer";
import useGetRecommendedAnime from "@modules/Anime/AnimeHome/Recommended/useGetRecommendedAnime";
import useGetTrendingAnime from "@modules/Anime/AnimeHome/Trending/useGetTrendingAnime";
import Navbar from "@components/Navbar";
import Anime from "@modules/Anime/Anime";
import useGetBannerAnime from "@modules/Anime/AnimeHome/Banner/useGetBannerAnime";

export default async function Home() {
  const {data: trendingData} = await useGetTrendingAnime();
  const {data: recommendedData} = await useGetRecommendedAnime();
  const {data: animeBannerData} = await useGetBannerAnime();

  const animeDataProps = {
    animeBannerData,
    trendingData,
    recommendedData,
  };

  return (
    <div className="bg-default_blue text-white ">
      <Navbar />
      <Anime {...animeDataProps} />
      <Footer />
    </div>
  );
}
