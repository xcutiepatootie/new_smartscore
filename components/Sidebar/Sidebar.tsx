import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import {
  MdOutlineAnalytics,
  MdOutlineSpaceDashboard,
  MdQuiz,
} from "react-icons/md";
import Signout_Button from "./Signout_Button";
import { Label } from "../ui/label";
import { margarine, poppins } from "@/util/fonts";
import Image from "next/image";

const Sidebar = async () => {
  const userSession = await getServerSession(config);
  let user_section = null;
  if (userSession?.user.role === "student") {
    const { section }: any = userSession?.user.userSection;
    user_section = section;
  }
  return (
    <nav
      className="peer:transition left-80 grid h-screen w-full grid-rows-5
    gap-2 bg-gradient-to-b
    from-[#F2CA4F] p-8 delay-150  duration-200 ease-out peer-focus:left-0 lg:left-0 lg:w-60"
    >
      <div className="p-4">
        <h1 className="items-center text-center text-2xl">
          <span className={margarine.className}>
            Smartscore
            <Image
              className="relative -mt-16 ml-32 h-auto w-auto"
              src={"/images/iconcroppped.png"}
              alt="HAHA"
              width={50}
              height={50}
            />
          </span>
        </h1>
      </div>

      <div className="mt-2 flex flex-col items-center justify-center">
        {userSession && (
          <>
            <h1 className="font-bold">{userSession.user.name}</h1>
            <p className="font-medium">{userSession.user.email}</p>
            {userSession.user.role === "student" && (
              <p>{userSession.user.userSection}</p>
            )}

            <p className="font-semibold capitalize">{userSession.user.role}</p>
          </>
        )}
      </div>

      <div className="">
        <div className=" my-4 h-full w-full border-gray-100 pb-4 pr-5">
          <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 px-5 hover:bg-gray-900 hover:shadow-lg">
            <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard"}>
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                Dashboard
              </h3>
            </Link>
          </div>

          <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 px-5 hover:bg-gray-900 hover:shadow-lg">
            <MdQuiz className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard/quizzes"}>
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                Quiz
              </h3>
            </Link>
          </div>

          <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
            <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard/profile"}>
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                Profile
              </h3>
            </Link>
          </div>
          <div className="group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:bg-gray-900 hover:shadow-lg">
            <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard/analytics"}>
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                Analytics
              </h3>
            </Link>
          </div>
        </div>
      </div>

      <div className="row-span-2 flex items-center justify-start">
        <Signout_Button />
      </div>
    </nav>
  );
};

export default Sidebar;
