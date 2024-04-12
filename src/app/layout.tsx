

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Full Stack With NextJS",
  description: "Full Stack With NextJS",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>

        <header>
          <h1>header</h1>
        </header>

        <main className="min-h-screen bg-[#000]">
          {children}
        </main>

        <footer>
          <p>footer</p>
        </footer>

      </body>
    </html>
  );
}

