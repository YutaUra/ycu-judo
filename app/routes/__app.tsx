import { Outlet } from "@remix-run/react";
import { Footer } from "flowbite-react";
import { Header } from "~/modules/common/Header/Header";

export default function AppTemplate() {
  return (
    <div>
      <div className="bg-gray-200">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>

      <Footer container={true}>
        <Footer.Copyright
          href="https://twitter.com/3594914"
          by="YutaUra"
          year={2023}
        />
      </Footer>
    </div>
  );
}
