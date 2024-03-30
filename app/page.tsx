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
    <div className="flex min-h-screen flex-col items-center h-screen">
      <div className="grid md:grid-cols-3 w-full h-full max-sm:grid-col-1">
        <div
          className="bg-gradient-to-r from-[#FED968] from-10% via-[#E7DCBC] via-50% to-[#FFE7A0] to-90%
          shadow-2xl
        flex flex-col justify-center items-center border border-black border-opacity-20 h-screen"
        >
          <Image
            className="md:-mt-24 md:h-auto md:w-auto sm:h-24 sm:w-24"
            src={"/images/iconcroppped.png"}
            alt="HAHA"
            width={500}
            height={500}
          />

          <h1 className="text-3xl">
            <span className={margarine.className}>Smartscore</span>
          </h1>
          <Label className="text-xl p-4 px-10 text-center">
            <span className={poppins.className}>
              Welcome to SmartScore! We're here to help educators understand
              student performance and empower them to shine brighter by building
              on strengths and tackling weaknesses.
            </span>
          </Label>
        </div>
        <div className="relative col-span-2">
          <div className="absolute inset-0 bg-signin-background-image bg-cover bg-center"></div>

          <div className="absolute inset-0 bg-[#FFECB4] bg-opacity-80"> </div>

          <div className="relative z-10 h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl">
                <span className={margarine.className}>
                  Smartscore
                  <Image
                    className="-mt-24 ml-40 h-full w-auto relative"
                    src={"/images/iconcroppped.png"}
                    alt="HAHA"
                    width={125}
                    height={150}
                  />
                </span>
              </h1>

              <Label className="text-xl px-10 text-center">
                <span className={poppins.className}>
                  Empowering Students, Enlightening Educators: Assessing
                  Strengths, Addressing Weaknesses
                </span>
              </Label>
            </div>
            <div className="mt-4 w-full h-auto">
              <SigininForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
