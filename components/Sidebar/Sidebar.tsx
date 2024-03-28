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
      className="grid grid-rows-5 gap-2 h-screen w-full p-8
    bg-gradient-to-b from-[#F2CA4F]
    left-80 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200"
    >
      <div className="p-4">
        <h1 className="text-2xl text-center items-center">
          <span className={margarine.className}>
            Smartscore
            <Image
              className="-mt-16 ml-32 w-auto h-auto relative"
              src={"/images/iconcroppped.png"}
              alt="HAHA"
              width={50}
              height={50}
            />
          </span>
        </h1>
      </div>

      <div className="flex flex-col mt-2 items-center justify-center">
        {userSession && (
          <>
            <h1 className="font-bold">{userSession.user.name}</h1>
            <p className="font-medium">{userSession.user.email}</p>
            {userSession.user.role === "student" && (
              <p>{userSession.user.userSection}</p>
            )}

            <p className="capitalize font-semibold">{userSession.user.role}</p>
          </>
        )}
      </div>

      <div className="">
        <div className=" my-4border-gray-100 pb-4 pr-5 w-full h-full">
          <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard"}>
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Dashboard
              </h3>
            </Link>
          </div>

          <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <MdQuiz className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard/quizzes"}>
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Quiz
              </h3>
            </Link>
          </div>

          <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard/profile"}>
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Profile
              </h3>
            </Link>
          </div>
          <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
            <Link href={"/dashboard/analytics"}>
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Analytics
              </h3>
            </Link>
          </div>
        </div>
      </div>

      <div className="row-span-2 flex justify-start items-center">
        <Signout_Button />
      </div>
    </nav>
  );
};

export default Sidebar;
