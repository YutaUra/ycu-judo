import { Link, Outlet } from "@remix-run/react";
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
      <div className="flex items-baseline">
        <h1 className="p-4 text-2xl">横浜市立大学柔道部 管理ページ</h1>

        <Link to="/" className="ml-4">
          通常のページ
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}
