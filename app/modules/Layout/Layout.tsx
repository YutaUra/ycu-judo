import type { ReactNode } from "react";
import { Header } from "../common/Header/Header";

export type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};
