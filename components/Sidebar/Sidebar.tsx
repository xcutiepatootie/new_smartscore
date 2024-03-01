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

const Sidebar = async () => {
  const userSession = await getServerSession(config);
  let user_section = null;
  if (userSession?.user.role === "student") {
    const { section }: any = userSession?.user.userSection;
    user_section = section;
  }
  return (
    <div className="p-4 w-full h-screen bg-white left-80 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
      <div className="flex flex-col justify-start item-center">
        <nav>
          <div className="pt-4">
            {userSession && (
              <>
                <p>
                  <FaRegUser className="" />
                  Name: {userSession.user.name}
                </p>
                <p>Email: {userSession.user.email}</p>
                {userSession.user.role === "student" && (
                  <p>Section: {user_section}</p>
                )}

                <p>Role: {userSession.user.role}</p>
              </>
            )}
          </div>

          <div className="flex flex-col justify-start item-center pt-8 pb-4 w-full">
            <div className=" my-4 border-b border-gray-100 pb-4 pr-5 w-full">
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

              <div className=" my-4">
                <Signout_Button />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
