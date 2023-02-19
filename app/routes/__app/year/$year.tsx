import type { LoaderArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Card } from "flowbite-react";
import { z } from "zod";
import { Hero } from "~/modules/common/Hero/Hero";
import { getPlaylistsByYear } from "~/modules/playlist/repository.server";

const YearParamsSchema = z.object({
  year: z
    .string()
    .transform((value, ctx) => {
      const year = parseInt(value);
      if (isNaN(year)) {
        throw ctx.addIssue({
          code: "custom",
          path: ["year"],
          message: "Invalid year",
        });
      }
      return year;
    })
    .pipe(z.number().int().min(2000).max(2100)),
});

export const loader = async ({ params }: LoaderArgs) => {
  const { year } = YearParamsSchema.parse(params);

  const playlists = await getPlaylistsByYear(year);

  return { playlists, year };
};

export default function Year() {
  const { playlists, year } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero />

      <div className="max-w-4xl px-8 py-4 mx-auto text-gray-800">
        <Link to="/" className="text-cyan-500">
          ← トップページに戻る
        </Link>

        <h1 className="text-4xl mt-2">{`${year}年の録画データ`}</h1>

        <p className="mt-2">
          リンクをクリックすることで YouTube へ遷移します。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {playlists.map((playlist) => (
            <Card
              key={playlist.id}
              href={playlist.url}
              // @ts-expect-error
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="text-xl font-bold underline-offset-2 underline decoration-slate-700">{`${playlist.date} ${playlist.title}`}</h3>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
