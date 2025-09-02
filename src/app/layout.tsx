import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider } from '@/components/providers/session-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '抖音直播互动软件 - 让直播更精彩',
  description: '专为抖音直播打造的互动工具，通过智能识别弹幕关键词，自动触发各种有趣的互动效果，让你的直播间瞬间变得生动活泼，观众参与度倍增！',
  keywords: '抖音直播,直播互动,弹幕互动,直播工具,鱼叉插鱼饲料',
  authors: [{ name: '抖音直播互动团队' }],
  viewport: 'width=device-width, initial-scale=1',
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
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
