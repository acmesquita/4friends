import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "4Friends",
  description: "Giveaway generator for secret friends",
  metadataBase: new URL('https://4friends-eight.vercel.app/'),
  twitter: {
    card: "summary",
    title: "4Friends",
    description: "Giveaway generator for secret friends",
    images: "/gift.png"
  },
  openGraph: {
    siteName: "https://4friends-eight.vercel.app/",
    title: "4Friends",
    description: "Giveaway generator for secret friends",
    url: "https://4friends-eight.vercel.app/",
    images: "/gift.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1 className="subpixel-antialiased font-bold tracking-wide text-green-950 text-4xl">
            <Link href="/">4Friends</Link>
          </h1>
          <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
            {children}
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-700 text-xs"
              href="https://github.com/acmesquita"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Criação de Catharina Mesquida
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
