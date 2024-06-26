
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <Header />
          <div>{children}</div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}