import { Outlet } from "@remix-run/react";
import { Header } from "~/modules/common/Header/Header";

export default function AppTemplate() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>

      <div>
        <p className="text-center text-gray-500 text-sm py-2">
          © 2023 YutaUra All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
