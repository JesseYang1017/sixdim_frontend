import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "心理测评平台",
  description: "专业的心理测评工具，帮助你更好地了解自己",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
