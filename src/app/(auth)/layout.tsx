import React from "react";

export default function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <nav
        className="fixed top-0 flex items-center bg-background 
        border-b h-16 w-full mx-auto justify-between px-4 shadow-xs"
      >
        Logo
      </nav>
      {children}
    </main>
  );
}
