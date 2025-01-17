import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode untuk tipe children
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Super Digital",
  description: "Penyedia Digital Produk Terbaik",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
       <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8454337513998618"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Strategi loading untuk script
        />
         <body className={inter.className}>{children}</body>
      </head>
     
    </html>
  );
}
