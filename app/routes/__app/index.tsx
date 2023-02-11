import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
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
            {playlists.map((playlist) => {
              // const query = playlist.url.split("?")[1];
              return (
                <div key={playlist.id} className="p-4 bg-gray-100 rounded-md">
                  {/* <div
                    className="w-full aspect-[560/315]"
                    dangerouslySetInnerHTML={{
                      __html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?${query}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
                    }}
                  /> */}

                  <a
                    href={playlist.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="block mt-3 underline-offset-2 underline decoration-slate-700"
                  >
                    <h3 className="text-xl font-bold">{`${playlist.date} ${playlist.title}`}</h3>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
