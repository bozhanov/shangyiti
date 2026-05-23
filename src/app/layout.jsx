import "./globals.css";

export const metadata = {
  title: "上一题",
  description: "回答上一题的答案。",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "上一题",
    description: "你还能记住上一题吗？",
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
