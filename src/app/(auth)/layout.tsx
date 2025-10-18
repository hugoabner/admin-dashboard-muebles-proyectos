import NavbarAuth from "@/components/layout/header/navbar-auth/navbar-auth";
import React from "react";

export default function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavbarAuth/>
      {children}
    </main>
  );
}
