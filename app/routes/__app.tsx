import { Outlet } from "@remix-run/react";
import { Header } from "~/modules/common/Header/Header";

export default function AppTemplate() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
