"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const signUpActive = pathName?.startsWith("/signup");
  const signInActive = pathName?.startsWith("/signin");
  const isLoggedIn = session !== null && status === "authenticated";

  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="flex grow items-center justify-between shadow-xl bg-violet-300 h-20">
        <div className="px-4">
          <Link className="text-2xl font-bold" href="/">
            SmartScore
          </Link>
        </div>
        <div className="hidden md:flex">
          {!isLoggedIn && (
            <div className="flex">
              <div className="px-4">
                <button
                  className={
                    signUpActive
                      ? "bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                      : "bg-sky-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                  }
                >
                  <Link href="/signup" prefetch={true}>
                    Sign Up
                  </Link>
                </button>
              </div>

              <div className="px-4">
                <button
                  className={
                    signInActive
                      ? "bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                      : "bg-sky-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                  }
                >
                  <Link href="/signin" prefetch={true}>
                    Sign In
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 md:hidden">
          <button onClick={toggleMobileMenu}>
            <HiMenu className="text-3xl" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center justify-center bg-violet-300 h-auto p-2 border-4 border-black">
            <button onClick={toggleMobileMenu}>Close</button>
            <div className="flex flex-col">
              <Link href="/signup">
                <button className="px-4 py-2">Sign Up</button>
              </Link>
              <Link href="/signin">
                <button className="px-4 py-2">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
