import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyMeals",
  description: "Personalized Meal Planning & Delivery",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
      >
        <Providers>

          {children}

        </Providers>
        <Toaster richColors />
      </body>
    </html>


  );
}
