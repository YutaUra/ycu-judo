import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params, context }: LoaderArgs) => {
  const res = await VIDEOS.get<{ title: string; url: string }>("hoge", "json");

  return json({
    date: new Date().toISOString(),
    value: res,
  });
};

export default function Index() {
  const { date, value } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl">Welcome to Remix at {date}</h1>
      <p>value is {JSON.stringify(value)}</p>
    </div>
  );
}
