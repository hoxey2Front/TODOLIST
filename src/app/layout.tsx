import type { Metadata } from "next";
import "./globals.css";
import Gnb from "@/components/Gnb";

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
      <body className="mx-auto bg-[var(--gray-50)] pc:w-[1200px]">
        <Gnb />
        {children}
      </body>
    </html>
  );
}
