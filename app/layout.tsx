import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "개발 영단어 · Dev Voca",
  description:
    "PR, 코드리뷰, 슬랙, CLI에서 마주치는 개발자 영어 단어장. 478개 단어를 카테고리와 빈도로 검색하세요.",
  openGraph: {
    title: "개발 영단어 · Dev Voca",
    description: "개발자가 협업에서 마주치는 영어 단어 478개",
  },
};

export const viewport: Viewport = {
  themeColor: "#f9fafb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-bg text-ink-900">{children}</body>
    </html>
  );
}
