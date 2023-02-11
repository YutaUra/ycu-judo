import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Card } from "flowbite-react";
import { Hero } from "~/modules/common/Hero/Hero";
import { getPlaylists } from "~/modules/playlist/repository.server";

export const loader = async ({ params, context }: LoaderArgs) => {
  const playlists = await getPlaylists();

  return json({
    playlists,
  });
};

export default function Index() {
  const { playlists } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero />

      <div className="max-w-4xl px-8 py-4 mx-auto text-gray-800">
        <p>横浜市立大学柔道部の大会等の撮影データを公開しています。</p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">これまでの撮影データ</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {playlists.map((playlist) => (
              <Card key={playlist.id} href={playlist.url}>
                <h3 className="text-xl font-bold underline-offset-2 underline decoration-slate-700">{`${playlist.date} ${playlist.title}`}</h3>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
