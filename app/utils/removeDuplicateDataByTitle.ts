import {AnimeData} from "@app-types/topAnimeData";

const removeDuplicateDataByTitle = (data: AnimeData[]) => {
  const seen = new Set();

  return data.filter((item) => {
    if (seen.has(item.entry[0].title)) {
      return false;
    }
    seen.add(item.entry[0].title);
    return true;
  });
};

export default removeDuplicateDataByTitle;
