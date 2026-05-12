import type { Metadata } from "next";
import "./globals.css";
import { ClickSoundProvider } from "./components/ClickSoundProvider";

export const metadata: Metadata = {
  title: "Portfolio - Product Designer",
  description: "Product Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <ClickSoundProvider>{children}</ClickSoundProvider>
      </body>
    </html>
  );
}