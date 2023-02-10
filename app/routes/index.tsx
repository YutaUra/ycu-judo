import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Tooltip, Button } from "flowbite-react";
import { Image, MimeType } from "remix-image";
import { Hero } from "~/modules/common/Hero/Hero";
import { Layout } from "~/modules/Layout/Layout";

export const loader = async ({ params, context }: LoaderArgs) => {
  const res = await VIDEOS.get<{ title: string; url: string }>("hoge", "json");

  return json({
    date: new Date().toISOString(),
    value: res,
  });
};

const images = [
  {
    src: "https://i.imgur.com/5cQnAQC.png",
    responsive: [
      {
        size: {
          width: 100,
          height: 100,
        },
      },
    ],
  },
  {
    src: "/camera.png",
    responsive: [
      {
        size: {
          width: 300,
          height: 300,
        },
      },
      {
        size: {
          width: 100,
          height: 100,
        },
        maxWidth: 600,
      },
    ],
  },
];

const formatsTest = {
  filePath: "/camera.",
  fileTypes: ["jpeg", "png", "webp"],
  sizes: [
    {
      size: { width: 300, height: 300 },
    },
  ],
};

const formatMap: Record<string, MimeType> = {
  jpeg: MimeType.JPEG,
  png: MimeType.PNG,
  webp: MimeType.WEBP,
};

export default function Index() {
  const { date, value } = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Hero />

      <h1 className="text-3xl">Welcome to Remix at {date}</h1>
      <p>value is {JSON.stringify(value)}</p>

      <Tooltip content="Flowbite is awesome">
        <Button>Hover to find out</Button>
      </Tooltip>
    </Layout>
  );
}
