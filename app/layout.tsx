import type { Metadata } from "next";
import {Toaster} from "@/components/ui/sonner";
import "./globals.css";

import { Plus_Jakarta_Sans } from "next/font/google";


export const metadata: Metadata = {
  title: "Collect the reviews",
  description:
    "Collect your reviews with ease and speed, and share them with the world",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased flex`}>
        {children}
      <Toaster />
      </body>
    </html>
  );
}
