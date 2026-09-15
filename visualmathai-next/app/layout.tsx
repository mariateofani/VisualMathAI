import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

export const metadata: Metadata = {
  title: "VisualMath AI",
  description:
    "Platform pembelajaran matematika interaktif berbasis Artificial Intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
