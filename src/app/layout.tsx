import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Animasi Remotion — Studio Preview",
  description:
    "Preview animasi intro yang dibuat dengan Remotion: ubah teks dan warna aksen secara live, lalu render ke video MP4.",
  keywords: ["Remotion", "video animasi", "intro animasi", "Next.js", "React video"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Video Animasi Remotion — Studio Preview",
    description: "Animasi intro programatik dengan Remotion: ubah teks & warna live di browser.",
    siteName: "Video Animasi Remotion",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
