"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";

const Signout_Dialog = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex h-10 w-full flex-row items-center justify-center rounded-md border-black bg-inherit text-base font-semibold text-gray-800 transition-colors ease-in-out hover:bg-slate-800 hover:text-white max-md:px-5 md:border">
          <span>
            <MdOutlineLogout size={25} />
          </span>
          Logout
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#eceacc]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to sign out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will sign you out from this application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#ebcd74] text-black hover:bg-[#8f7a3b] hover:text-white"
              onClick={() => signOut()}
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Signout_Dialog;
