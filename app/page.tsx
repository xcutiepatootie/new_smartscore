import { Label } from "@/components/ui/label";
import { margarine } from "@/util/fonts";
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
      <div className="grid grid-cols-2 w-full h-full">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="-mt-56"
            src={"/images/iconcroppped.png"}
            alt="HAHA"
            width={500}
            height={250}
          />

          <Label className="text-3xl">
            <span className={margarine.className}>Smartscore</span>
          </Label>
        </div>
        <div className="">
          <h1>Landing page</h1>
        </div>
      </div>
    </div>
  );
}
