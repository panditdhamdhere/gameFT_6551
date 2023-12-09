import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameFT-6551",
  description:
    "GameFT-6551: Transforming gaming with ERC-6551 NFTs. Play, collect, and unlock unique features. Join the future of GameFi now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
