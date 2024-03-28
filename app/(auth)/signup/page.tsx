import React from "react";
import SignupForm from "@/components/Forms/SignupForm";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-signin-background-image bg-cover bg-center"></div>

        <div className="absolute inset-0 bg-[#FFECB4] bg-opacity-80"> </div>
        <div className="relative z-10 h-screen flex flex-col justify-center items-center">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
