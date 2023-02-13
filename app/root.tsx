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
