import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

import { Sidebar } from "@/components/sidebar"
const inter = Inter({subsets: ['latin']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialised bg-background ", inter.className)}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
