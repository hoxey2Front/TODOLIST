import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Todo List",
  description: "할 일 목록을 관리하는 To Do 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto bg-[var(--gray-50)] xl:w-[1200px]">
        <header className="h-[60px] flex items-center">
          <Link href="/">
            <img src="/images/Size=Large.svg" alt="logo_large" className="hidden md:inline xl:inline"/>
            <img src="/images/Size=Small.svg" alt="logo_small" className="inline md:hidden xl:hidden"/>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
