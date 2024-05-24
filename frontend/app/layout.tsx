import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/ui/globals.css';
import { AppWrapper } from "./lib/UserContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMate: Join the comunity",
  description: "MindMate Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='${inter.className}'>
        <AppWrapper>
        {children}
        </AppWrapper>
      </body>
    </html>
  );
}
