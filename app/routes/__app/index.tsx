import type { LoaderArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Accordion, Card } from "flowbite-react";
import { Hero } from "~/modules/common/Hero/Hero";
import { getPlaylists } from "~/modules/playlist/repository.server";

export const loader = async ({ params, context }: LoaderArgs) => {
  const playlists = await getPlaylists();

  // group by year
  const playlistsByYear = playlists.reduce<Record<number, typeof playlists>>(
    (acc, playlist) => {
      const year = playlist.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(playlist);
      return acc;
    },
    {}
  );

  // sort by year
  const sortedPlaylists = Object.entries(playlistsByYear)
    .map(([year, playlists]) => [Number(year), playlists] as const)
    .sort(([yearA], [yearB]) => {
      return yearB - yearA;
    })
    .map(([year, playlists]) => ({ year, playlists }));

  return json({
    sortedPlaylists,
  });
};

export const meta: MetaFunction = () => {
  return {
    description: "横浜市立大学柔道部の大会等の撮影データを公開しています。",
  };
};

export default function Index() {
  const { sortedPlaylists } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero />

      <div className="max-w-4xl px-8 py-4 mx-auto text-gray-800">
        <p>横浜市立大学柔道部の大会等の撮影データを公開しています。</p>

        <p>調べたい年をクリックすると詳細が出てきます。</p>
        <div className="mt-8 grid gap-4 grid-cols-1">
          {sortedPlaylists.map(({ year, playlists }) => (
            <Link key={year} to={`/year/${year}`}>
              <Card>
                <h3 className="text-xl font-bold underline-offset-2 underline decoration-slate-700">{`${year}年`}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
