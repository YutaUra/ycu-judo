import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Tooltip, Button } from "flowbite-react";
import { Hero } from "~/modules/common/Hero/Hero";

export const loader = async ({ params, context }: LoaderArgs) => {
  const res = await PLAYLISTS.get<{ title: string; url: string }>(
    "hoge",
    "json"
  );

  return json({
    date: new Date().toISOString(),
    value: res,
  });
};

export default function Index() {
  const { date, value } = useLoaderData<typeof loader>();
  return (
    <>
      <Hero />

      <h1 className="text-3xl">Welcome to Remix at {date}</h1>
      <p>value is {JSON.stringify(value)}</p>

      <Tooltip content="Flowbite is awesome">
        <Button>Hover to find out</Button>
      </Tooltip>
    </>
  );
}
