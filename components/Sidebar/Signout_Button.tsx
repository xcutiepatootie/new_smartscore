"use client";
import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "../ui/button";

const Signout_Button = () => {
  return (
    <Button
      variant="outline"
      className="text-base bg-inherit text-gray-800 border-black hover:bg-slate-800 hover:text-white font-semibold w-full"
      onClick={() => signOut()}
    >
      <span>
        <MdOutlineLogout size={25}/>
      </span>
      Logout
    </Button>
  );
};

export default Signout_Button;
