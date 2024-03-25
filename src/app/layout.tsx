import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Providers from "~/components/providers";
import { ROUTES } from "~/lib/constants";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "BookStore Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col`}
      >
        <Providers>
          <header className="bg-blue-600 p-8 text-white">
            <nav className="mx-auto flex max-w-screen-xl items-center justify-between">
              <Link href={ROUTES.HOME}>
                <h1 className="text-3xl font-semibold">BookStore</h1>
              </Link>
              <ul className="flex gap-4">
                <li>
                  <Link href={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                  <Link href={ROUTES.BOOKS_LIST}>Books</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-6">
            {children}
          </main>
          <footer className="bg-slate-600 py-4 text-white">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm sm:text-center">
                © 2024{" "}
                <Link href={ROUTES.HOME} className="hover:underline">
                  BookStore
                </Link>
                . All Rights Reserved.
              </span>
              <ul className="mt-3 flex flex-wrap items-center text-sm font-medium  sm:mt-0">
                <li>
                  <Link
                    href={ROUTES.HOME}
                    className="me-4 hover:underline md:me-6"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.BOOKS_LIST}
                    className="me-4 hover:underline md:me-6"
                  >
                    Books
                  </Link>
                </li>
              </ul>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
