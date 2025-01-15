import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode untuk tipe children

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Super Digital",
  description: "Penyedia Digital Produk Terbaik",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
