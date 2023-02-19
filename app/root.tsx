import CSS from "./styles/app.css";
import FontCSS from "./styles/font.css";
import remixImageStyles from "remix-image/remix-image.css";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import ToastCSS from "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "./modules/common/Header/Header";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "横浜市立大学柔道部",
  viewport: "width=device-width,initial-scale=1",
  robots: "noindex",
});

export function links() {
  return [
    { rel: "stylesheet", href: CSS },
    { rel: "stylesheet", href: remixImageStyles },
    { rel: "stylesheet", href: ToastCSS },
    { rel: "stylesheet", href: FontCSS },
    // { rel: "preconnect", href: "https://fonts.googleapis.com" },
    // { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    // {
    //   rel: "stylesheet",
    //   href: "https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap&text=横浜市立大学柔道部",
    // },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>エラーが発生</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="bg-gray-200">
          <Header />
          <div className="max-w-4xl mx-auto p-4">
            <h1>エラーが発生しました。</h1>

            <Outlet />
          </div>

          <div>
            <p className="text-center text-gray-500 text-sm py-2">
              © 2023 YutaUra All Rights Reserved.
            </p>
          </div>
        </div>

        <Scripts />
      </body>
    </html>
  );
}
