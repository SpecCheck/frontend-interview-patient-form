import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpecCheck Lens Ordering",
  description: "Ordering process for SpecCheck lenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
