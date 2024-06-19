"use client";

import dynamic from "next/dynamic";
const Topbar = dynamic(() => import("@/components/Nav/Topbar"), { ssr: false });
import ContentLayout from "@/components/common/Layout/ContentLayout";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <ContentLayout>{children}</ContentLayout>
    </>
  );
}
