import type { Metadata } from 'next';
import { Caveat, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ogImage from "./opengraph-image.png";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const sharpie = Caveat({
  variable: '--font-sharpie',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Infinite Magazine',
  icons: {
    icon: '/favicons/favicon.ico',
  },
  description: 'Infinite is a student-run magazine seeking to reframe art, politics, culture, and aesthetics through the lens of fashion.',
  openGraph: {
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sharpie.variable} antialiased overflow-x-hidden !bg-[#F2F1EB] min-h-screen !m-0 !p-0`}
      >
        {children}
      </body>
    </html>
  );
}
