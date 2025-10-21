import { NavbarAuth } from "@/components/layout/header";
import React from "react";

export default function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavbarAuth />
      {children}
    </main>
  );
}
