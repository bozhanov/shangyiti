import "./globals.css";

export const metadata = {
  title: "上一题",
  description: "翻一翻，总能找到点啥...",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "上一题",
    description: "翻一翻，总能找到点啥...",
    images: ["/share.png"],
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
