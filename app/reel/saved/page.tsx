import {ReelPage} from "@modules/reel/ReelChrome";
import ReelSaved from "@modules/reel/ReelSaved";

export const metadata = {title: "Saved · Nimelist"};

export default function ReelSavedPage() {
  return (
    <ReelPage mobileLabel="YOUR LIST">
      <ReelSaved />
    </ReelPage>
  );
}
