import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { isNonNull } from "~/lib/isNonNull";
import { getPlaylists } from "~/modules/playlist/repository.server";

export { headers } from "~/modules/admin/route";

export const loader = async () => {
  const playlists = await getPlaylists();

  return json({
    data: playlists.filter(isNonNull),
  });
};

export default function AdminIndex() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>管理ページ</h1>

      <ul>
        {data.data.map((playlist) => (
          <li key={playlist.url}>{playlist.url}</li>
        ))}
      </ul>
    </div>
  );
}
