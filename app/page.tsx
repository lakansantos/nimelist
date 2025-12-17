import useGetTrending from "./modules/Anime/useGetTrendings";

export default async function Home() {
  const {data} = await useGetTrending();

  console.log(data, "data");

  return (
    <div className="h-screen bg-default_blue text-white">
      <ul>
        {data.map((item, index) => {
          const {mal_id, title} = item;
          return <li key={mal_id}>{title}</li>;
        })}
      </ul>
    </div>
  );
}
