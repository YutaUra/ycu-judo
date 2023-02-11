import { Outlet } from "@remix-run/react";
import type { LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { isAuthorized, headers } from "~/modules/admin/route";

export const loader = async ({ request }: LoaderArgs) => {
  if (!(await isAuthorized(request))) {
    return json({ authorized: false }, { status: 401 });
  }

  return json({
    authorized: true,
  });
};

export default function AdminTemplate() {
  const data = useLoaderData<typeof loader>();

  if (!data.authorized) {
    return <p>Unauthorized</p>;
  }

  return (
    <div>
      <h1>管理ページ</h1>

      <Outlet />
    </div>
  );
}
