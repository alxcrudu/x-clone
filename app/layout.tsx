import { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { Toaster } from "react-hot-toast";
import "../styles/global.css";

import { Poppins } from "next/font/google";

import Sidebar from "@/components/Sidebar/Sidebar";
import RightSidebar from "@/components/Sidebar/RightSidebar";
import SecondaryLayout from "@/components/SecondaryLayout/SecondaryLayout";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";

import { authOptions } from "@/libs/authOptions";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: false
});

export const metadata = {
  title: "X Clone",
  description: "X Clone",
};

interface IRootLayoutProps {
  children: ReactNode;
};

const RootLayout: React.FC<IRootLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body className={poppins.className}>
        <NextAuthSessionProvider>
          {session ? (
            <div className="xl:px-30 mx-auto h-full max-w-6xl">
              <div className="flex min-h-screen flex-col md:flex-row md:justify-center lg:justify-between">
                <Sidebar session={session} />
                <main className="app">{children}</main>
                <RightSidebar />
              </div>
            </div>
          ) : (
            <main>
              <SecondaryLayout />
              {children}
            </main>
          )}
        </NextAuthSessionProvider>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#1D9BF0",
                secondary: "#FFFFFF",
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
