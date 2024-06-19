"use client";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { Rubik } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";

import { ProfileContext, ProfileContextProvider } from "@/context/profile.context";
import Layout from "@/components/common/Layout";
import React from "react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    // update default color
  },
  sidebar: {
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700 cursor-pointer",
      active: "bg-gray-300 hover:bg-gray-300 dark:bg-gray-700",
    },
  },
};

const RUBIK_FONT = Rubik({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { state } = React.useContext(ProfileContext);

  return (
    <html lang="en">
      <body
        className={RUBIK_FONT.className}
        style={{
          margin: "0px",
          padding: "0px",
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#F7F7F7",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ProfileContextProvider>
            <Flowbite theme={{ theme: customTheme }}>
              <Layout>{children}</Layout>
            </Flowbite>
          </ProfileContextProvider>
          <ToastContainer
            position="top-left"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
