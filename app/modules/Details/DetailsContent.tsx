import DetailsAnimeContent from "./DetailsAnimeContent";
import DetailsAnimeOtherContent from "./DetailsAnimeOtherContent";

const DetailsContent = () => {
  return (
    <div className="below-container w-full flex-1">
      <DetailsAnimeContent />
      <DetailsAnimeOtherContent />
    </div>
  );
};

export default DetailsContent;
