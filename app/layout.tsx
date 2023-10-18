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
import PostModal from "@/components/modals/post-modal";
import EditPostModal from "@/components/modals/edit-post-modal";
import EditProfileModal from "@/components/modals/edit-profile-modal";

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

         
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
      </html>
  );

  return (
        <AuthSessionProvider>
          {!session && <TopBar />}
          <div className="flex min-h-full">
            {session && (
              <aside className="bg-white basis-[50px] min-w-[50px] w-[50px] lg:basis:[175px] lg:min-w-[175px] lg:w-[175px] flex-grow-0 border-r border-solid border-r-1 border-[#DBDBDB] relative z-[9]">
                <div className="fixed h-full flex-[50px] min-w-[50px] w-[50px] lg:flex-[175px] lg:min-w-[175px] lg:w-[175px] no-scrollbar overflow-x-visible max-h-full">
                  <Sidebar />
                </div>
              </aside>
            )}
            <main className="px-10 py-10 w-[70rem] mx-auto">{children}</main>
          </div>
          <div className="z-[999] relative">
            {/* <AuthModal />
            <UsersModal />
            <UploadAvatarModal />
            <PostModal />
            <EditPostModal />
            <EditProfileModal /> */}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
