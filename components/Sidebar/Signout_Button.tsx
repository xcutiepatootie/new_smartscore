"use client"
import { signOut } from 'next-auth/react'
import { MdOutlineLogout } from 'react-icons/md'

const Signout_Button = () => {
    return (
        <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
            <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold " onClick={() => signOut()}>
                Logout
            </h3>
        </div>
    )
}

export default Signout_Button