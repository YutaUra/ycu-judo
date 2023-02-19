import { Link } from "@remix-run/react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <Link to="/">
        <h1 className="text-2xl font-bold">横浜市立大学柔道部</h1>
      </Link>
    </header>
  );
};
