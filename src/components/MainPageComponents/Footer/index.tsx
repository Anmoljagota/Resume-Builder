import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsLinkedin, BsTwitter } from "react-icons/bs";
import MasaiLogo from "@/assets/Masai-Logo.svg";

const Footer = () => {
  const options = [
    "Masai Alumni",
    "Hire form us",
    "About Us",
    "Our Team",
    "Our Investors",
    "FAQ",
    "Careers",
    "Testimonials",
    "Newsroom",
    "Referral Program",
    "Masai Blog",
    "Contact Us",
    "Masai Learn",
    "Program'd by Masai",
    "Become Coach",
    "Indurstry Mentors",
  ];
  return (
    <div className="bg-[#fff] w-full mt-16">
      <div className="bg-[#0A0103] px-10 sm:px-16 md:px-30 lg:px-48  pt-4 pb-40 text-[#fff] mx-0.5 relative top-[-40px]">
        <div
          className="w-full flex flex-col xs:flex-row justify-between items-center gap-y-2 xs:gap-y-0 py-4 px-4"
          style={{
            boxShadow: " 0px 1px 0px 0px rgba(243, 242, 242, 0.20)",
          }}
        >
          <Image src={MasaiLogo} alt="Masai Logo" className="h-10 w-28" />
          <div className="flex items-center gap-x-6">
            <p>Follow us-</p>
            <BsTwitter />
            <BsFacebook />
            <BsLinkedin />
          </div>
        </div>
        <div className="w-full lg:w-5/6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 sm:gap-y-0 mt-6 px-4">
          <div className="w-full flex justify-start">
            <p className="bg-[#F3F2F2] text-[#0A0103] text-center text-sm rounded-full py-0.5 px-1 ">
              Software Development- Full Time
            </p>
          </div>
          <div className="w-full flex justify-start">
            <p className="bg-[#F3F2F2] text-[#0A0103] text-center text-sm rounded-full py-0.5 px-1">
              Software Development- Part Time
            </p>
          </div>
          <div className="w-full flex justify-start">
            <p className="bg-[#F3F2F2] text-[#0A0103] text-center text-sm rounded-full py-0.5 px-1">
              Data Analytics- Part Time
            </p>
          </div>
        </div>
        <div
          style={{
            boxShadow: " 0px 1px 0px 0px rgba(243, 242, 242, 0.20)",
          }}
        >
          <div className="w-full lg:w-5/6  grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pb-6 px-4">
            {options.map((item, index) => (
              <p key={item} className="text-[#CECCCD] text-base font-normal text-left">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4">
          <p className="text-[#848081] text-sm font-normal">
            &copy; 2023 by Masai School | A Nolan Edutech Pvt Ltd Venture
          </p>
          <div className="flex items-start gap-x-2">
            <Link href="/" className="text-[#848081] text-sm font-normal underline">
              Privacy Policy
            </Link>
            <p className="text-[#848081] text-sm font-normal">&</p>
            <Link href="/" className="text-[#848081] text-sm font-normal underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
