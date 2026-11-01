import {getTrending} from "@lib/kitsu";
import {ReelPage} from "@modules/reel/ReelChrome";
import ReelSearch from "@modules/reel/ReelSearch";

export const metadata = {title: "Search · Nimelist"};

type Props = {searchParams: Record<string, string | string[] | undefined>};

export default async function ReelSearchPage({searchParams}: Props) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const popular = (await getTrending()).slice(0, 8);
  return (
    <ReelPage mobileLabel="SEARCH">
      <h1 className="sr-only">Search</h1>
      <ReelSearch initialQuery={q} popular={popular} />
    </ReelPage>
  );
}
