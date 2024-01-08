"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
    MdQuiz,
} from 'react-icons/md'
import { CgProfile } from "react-icons/cg";
import { usePathname } from 'next/navigation';




const Sidebar = () => {
    const { data: session, status } = useSession();

    const activeLink = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Quiz", href: "/dashboard/quizzes" },
        { name: "Profile", href: "/dashboard/profile" },
        { name: "Analytics", href: "/dashboard/analytics" }
    ]

    const pathName = usePathname()

    const activeLinkItem = activeLink.find(link => link.href === pathName);

    const user = session?.user || null
    
    return (
        <div className="p-4 w-full h-screen bg-white left-80 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 flex">
            <div className="flex flex-col justify-start item-center">
                <nav>
                    <div className="pt-4">
                        {user && (
                            <>
                                <p><FaRegUser className='' />Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>Role: {user.role}</p>
                                
                                
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
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold " onClick={() => signOut()}>
                                        Logout
                                    </h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
