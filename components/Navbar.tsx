"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { margarine } from "@/utils/fonts";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "./ui/button";
import {
  MdOutlineAnalytics,
  MdOutlineSpaceDashboard,
  MdQuiz,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

let Links = [
  { name: "Dashboard", link: "/" },
  { name: "Quiz", link: "/" },
  { name: "Profile", link: "/" },
  { name: "Analytics", link: "/" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const signUpActive = pathName?.startsWith("/signup");
  const signInActive = pathName?.startsWith("/signin");
  const isLoggedIn = session !== null && status === "authenticated";
  const [open, setOpen] = useState(false);

  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/*  <div className="flex h-20 w-screen grow items-center justify-between bg-amber-200 shadow-xl">
        <div className="px-4">
          <Link className="text-2xl font-bold" href="/">
            <h1 className="text-2xl">
              <span className={margarine.className}>
                Smartscore
                <Image
                  className="relative -mt-14 ml-28 h-auto w-auto"
                  src={"/images/iconcroppped.png"}
                  alt="HAHA"
                  width={50}
                  height={50}
                />
              </span>
            </h1>
          </Link>
        </div>
      </div> */}

      <div className="fixed left-0 top-0 z-50 w-full shadow-md">
        <div className="relative items-center justify-between bg-amber-200 px-7 py-4 md:flex md:px-10">
          <div className="flex cursor-pointer items-center text-2xl font-bold text-gray-800">
            <Link className="text-2xl font-bold" href="/">
              <h1 className="text-2xl">
                <span className={margarine.className}>
                  Smartscore
                  <Image
                    className="relative -mt-14 ml-28 h-auto w-auto"
                    src={"/images/iconcroppped.png"}
                    alt="HAHA"
                    width={50}
                    height={50}
                  />
                </span>
              </h1>
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-6 cursor-pointer text-3xl md:hidden"
          >
            <GiHamburgerMenu name={open ? "close" : "menu"} />
          </div>
          <ul
            className={`absolute left-0 z-40 w-full bg-yellow-50 pb-12 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 ${open ? "top-[4.5rem]" : "top-[-490px]"}`}
          >
            <li className="my-7 flex items-center justify-center text-xl md:my-0 md:ml-8">
              <div className="group m-auto flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 px-5 duration-300 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/dashboard"}>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                    Dashboard
                  </h3>
                </Link>
              </div>
            </li>

            <li className="my-7 flex items-center justify-center text-xl md:my-0 md:ml-8">
              <div className="group m-auto flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 px-5 duration-300 hover:bg-gray-900 hover:shadow-lg">
                <MdQuiz className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/dashboard/quizzes"}>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                    Quiz
                  </h3>
                </Link>
              </div>
            </li>

            <li className="my-7 flex items-center justify-center text-xl md:my-0 md:ml-8">
              <div className="group m-auto flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 px-5 duration-300 hover:bg-gray-900 hover:shadow-lg">
                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/dashboard/profile"}>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                    Profile
                  </h3>
                </Link>
              </div>
            </li>

            <li className="my-7 flex items-center justify-center text-xl md:my-0 md:ml-8">
              <div className="group m-auto flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 px-5 duration-300 hover:bg-gray-900 hover:shadow-lg">
                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                <Link href={"/dashboard/analytics"}>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                    Analytics
                  </h3>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
