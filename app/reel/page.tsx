import Link from "next/link";
import {franchiseKey} from "@lib/anime";
import {getTopRated, getTrending} from "@lib/kitsu";
import ReelHome from "@modules/reel/ReelHome";

const SCENE_COUNT = 5;

export default async function ReelPage() {
  const [trending, topRated] = await Promise.all([
    getTrending(),
    getTopRated(1),
  ]);
  const scenes = trending
    .filter((a) => a.poster || a.cover)
    .slice(0, SCENE_COUNT);

  if (scenes.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-[-0.04em] text-[#3A4152]">
          CUT.
        </h1>
        <p className="max-w-sm text-muted-strong">
          Kitsu didn&apos;t answer just now, so the reel is empty. Try again in
          a minute.
        </p>
        <Link href="/browse" className="font-semibold hover:text-amber">
          Browse instead →
        </Link>
      </main>
    );
  }

  // Keep Top rated free of shows already in a scene (incl. other seasons).
  const inScenes = new Set(scenes.map((s) => franchiseKey(s.title)));
  const top = topRated
    .filter((a) => !inScenes.has(franchiseKey(a.title)))
    .slice(0, 12);

  return <ReelHome scenes={scenes} top={top} />;
}
