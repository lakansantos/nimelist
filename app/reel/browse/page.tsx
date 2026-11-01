import {loadBrowse, parseBrowseParams} from "@lib/browse";
import {ReelPage} from "@modules/reel/ReelChrome";
import ReelBrowse from "@modules/reel/ReelBrowse";

export const metadata = {title: "Browse · Nimelist"};

type Props = {searchParams: Record<string, string | string[] | undefined>};

export default async function ReelBrowsePage({searchParams}: Props) {
  const params = parseBrowseParams(searchParams);
  const data = await loadBrowse(params);
  return (
    <ReelPage mobileLabel={data.listLabel.toUpperCase()}>
      <h1 className="sr-only">Browse anime</h1>
      <ReelBrowse params={params} {...data} />
    </ReelPage>
  );
}
