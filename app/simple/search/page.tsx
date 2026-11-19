import {getTrending} from "@lib/kitsu";
import SimpleSearch from "@modules/simple/SimpleSearch";

export const metadata = {
  title: "Search · Nimelist",
  robots: {index: false},
};

type Props = {searchParams: Record<string, string | string[] | undefined>};

export default async function SimpleSearchPage({searchParams}: Props) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const popular = (await getTrending()).slice(0, 8);
  return <SimpleSearch initialQuery={q} popular={popular} />;
}
