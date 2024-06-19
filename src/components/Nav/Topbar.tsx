"use client";
import React from "react";
import { Navbar } from "flowbite-react";
import { useLogout, useMyDetails } from "@/hooks/useAuth";
import { navbarColors } from "./color";
import { AvatarContext } from "@/utils/avatar.utils";
import OutlinedButton from "../common/Button/OutlinedButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import Paper from "../common/Paper";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/route.utils";
import { ResumeCreator } from "../ResumeHandler/ResumeList";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

function Topbar({
  background,
  color,
  stickyBackground,
  childComponent,
}: {
  background?: string;
  color?: string;
  stickyBackground?: string;
  childComponent?: React.ReactNode;
}) {
  const router = useRouter();
  const { mutate: logout, isSuccess } = useLogout();
  const mode = "light";
  const { data } = useMyDetails();
  const [showResponsiveMenu, setShowResponsiveMenu] = React.useState(false);
  const [backgroundColor, setBackgroundColor] = React.useState<string>(
    background || navbarColors[mode].backgroundColor
  );

  window.addEventListener("scroll", () => {
    const scrollHeight = window.scrollY;
    if (scrollHeight > 50) {
      setBackgroundColor(stickyBackground || navbarColors[mode].backgroundColor);
    } else {
      setBackgroundColor(background || navbarColors[mode].backgroundColor);
    }
  });

  return (
    <Navbar
      fluid
      className={`nav-bg w-full z-50 sticky max-w-screen-2xl sticky:bg-red-500 top-0 text-[${navbarColors[mode].color}]`}
      style={{
        boxShadow: `3px 2px 4px rgba(0, 0, 0, 0.1)`,
        background: backgroundColor,
      }}
      onMouseMove={(e) => {
        console.log();
      }}
    >
      <div className="w-full  mx-22 sm:mx-20  flex items-center justify-between">
        <Navbar.Brand className="flex items-center gap-x-3">
          <Link
            className={`font-Poppins uppercase font-bold text-xl`}
            style={{
              color: color || navbarColors[mode].logoColor,
            }}
            href={Routes.home()}
          >
            resume builder
          </Link>
          <Link
            className={`font-Poppins capitalize font-normal text-base`}
            style={{
              color: color || navbarColors[mode].logoColor,
            }}
            href={Routes.dashboard()}
          >
            dashboard
          </Link>
        </Navbar.Brand>
        <div className="sm:flex items-center gap-5 hidden">
          {childComponent ? childComponent : <ResumeCreator />}

          <div
            className="flex gap-2 items-center justify-center h-[38px] w-[38px] rounded-full"
            style={{
              backgroundImage: `linear-gradient(#9424F3, #5170F0)`,
            }}
          >
            <span className="text-[#FFF]">{AvatarContext(data?.name || "")}</span>
          </div>
        </div>
        <div className="sm:hidden">
          <OutlinedButton
            startIcon={<GiHamburgerMenu className="md:h-5 md:w-5 sm:h-4 sm:w-4 sxs:h-3 sxs:w-3" />}
            onClick={() => setShowResponsiveMenu(true)}
          />
        </div>
        {showResponsiveMenu && (
          <div className={twMerge("absolute w-full h-full top-0 left-0 transition-transform  duration-700")}>
            <Paper className="h-[100vh] w-full">
              <div className="flex items-center justify-between  p-3">
                <Navbar.Brand>
                  <p
                    className={`font-Poppins uppercase font-bold text-lg`}
                    style={{
                      color: navbarColors[mode].logoColor,
                    }}
                  >
                    resume builder
                  </p>
                </Navbar.Brand>
                <OutlinedButton
                  startIcon={<AiOutlineClose className="h-2 w-2 md:h-5 md:w-5 sm:h-4 sm:w-4 sxs:h-3 sxs:w-3" />}
                  onClick={() => setShowResponsiveMenu(false)}
                />
              </div>
              <div className="flex flex-col items-center py-5 gap-2">
                <div
                  className="flex gap-2 items-center justify-center h-20 w-20 rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(#9424F3, #5170F0)`,
                  }}
                >
                  <span className="text-[#FFF] text-3xl">{AvatarContext(data?.name || "")}</span>
                </div>
                <p
                  className="text-lg capitalize font-500"
                  style={
                    {
                      // color: textColor,
                    }
                  }
                >
                  {data?.name}
                </p>
                <p>{data?.email}</p>
                {childComponent ? childComponent : <ResumeCreator />}
              </div>
            </Paper>
          </div>
        )}
      </div>
    </Navbar>
  );
}

export default Topbar;
