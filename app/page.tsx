import SigininForm from "@/components/Forms/SigninForm";
import { Label } from "@/components/ui/label";
import { margarine, poppins } from "@/utils/fonts";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    console.log(session.user.id);
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen min-h-screen flex-col items-center">
      <div className="max-sm:grid-col-1 grid h-full w-full md:grid-cols-3">
        <div
          className="flex h-screen flex-col items-center justify-center border border-black
          border-opacity-20
        bg-gradient-to-r from-[#FED968] from-10% via-[#E7DCBC] via-50% to-[#FFE7A0] to-90% shadow-2xl"
        >
          <Image
            className="sm:h-24 sm:w-24 md:-mt-24 md:h-auto md:w-auto"
            src={"/images/iconcroppped.png"}
            alt="HAHA"
            width={500}
            height={500}
          />

          <h1 className="text-3xl">
            <span className={margarine.className}>Smartscore</span>
          </h1>
          <h1 className="p-4 px-10 text-center text-xl">
            <span className={poppins.className}>
              Welcome to SmartScore! We&apos;re here to help educators
              understand student performance and empower them to shine brighter
              by building on strengths and tackling weaknesses.
            </span>
          </h1>
        </div>
        <div className="relative col-span-2">
          <div className="absolute inset-0 bg-signin-background-image bg-cover bg-center"></div>

          <div className="absolute inset-0 bg-[#FFECB4] bg-opacity-80"> </div>

          <div className="relative z-10 flex h-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl">
                <span className={margarine.className}>
                  Smartscore
                  <Image
                    className="relative -mt-24 ml-40 h-full w-auto"
                    src={"/images/iconcroppped.png"}
                    alt="HAHA"
                    width={125}
                    height={150}
                  />
                </span>
              </h1>

              <h1 className="px-10 text-center text-xl">
                <span className={poppins.className}>
                  Empowering Students, Enlightening Educators: Assessing
                  Strengths, Addressing Weaknesses
                </span>
              </h1>
            </div>
            <div className="mt-4 h-auto w-full">
              <SigininForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
