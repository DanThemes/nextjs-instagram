import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar/sidebar";
import AuthSessionProvider from "@/providers/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import TopBar from "@/components/top-bar";
import UsersModal from "@/components/modals/users-modal";
import UploadAvatarModal from "@/components/modals/upload-avatar-modal";
import AuthModal from "@/components/modals/auth-modal";
import Login from "@/components/not-logged-in";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram",
  description: "An Instagram-like app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          {!session && <TopBar />}
          <div className="flex min-h-full">
            {session && (
              <aside className="flex-[175px] min-w-[175px] w-[175px] flex-grow-0 border-r border-solid border-r-1 border-[#DBDBDB] relative z-[999]">
                <div className="fixed flex-[175px] min-w-[175px] w-[175px]">
                  <Sidebar />
                </div>
              </aside>
            )}
            <main className="px-10 py-10 w-[70rem] mx-auto">{children}</main>
          </div>
          <div className="z-[999] relative">
            <AuthModal />
            <UsersModal />
            <UploadAvatarModal />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
