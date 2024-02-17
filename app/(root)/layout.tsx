import { ReactNode } from "react";
import Header from "@/components/shared/header/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
