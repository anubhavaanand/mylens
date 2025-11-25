import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Intelligence Workspace",
  description: "Transform text into interactive mind maps, timelines, and quadrant diagrams powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
