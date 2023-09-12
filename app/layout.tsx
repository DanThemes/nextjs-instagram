import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getServerSession } from "next-auth/next";
import Sidebar from "@/components/sidebar/sidebar";
import AuthSessionProvider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <div className="flex h-full">
            <Sidebar />
            <main className="flex-1 px-10 py-4">{children}</main>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
