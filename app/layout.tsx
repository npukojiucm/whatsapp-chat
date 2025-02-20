import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React, { JSX } from 'react';
import '@/styles/global.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Green-api',
  description: 'Тестовое задание',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id={'app-root'}>{children}</div>
      </body>
    </html>
  );
}
