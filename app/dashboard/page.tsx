//"use client"
import TnumberOfQuiz from "@/components/Cards/Dashboard/TnumberOfQuiz";
import TnumberOfQuizCreatedByUser from "@/components/Cards/Dashboard/TnumberOfQuizCreatedByUser";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
  /*  const { data: session, status } = useSession()
   console.log(status)
   if (status === "authenticated") {
     console.log(session)
   } */
  const session = await getServerSession(config);
  //console.log(session);

  return (
    <>
      <div className="">
        <h1>Dashboard</h1>

        <div className="flex flex-row max-sm:flex=col">
          {session?.user.role === "faculty" ? (
            <div className="mx-2">
              <TnumberOfQuizCreatedByUser userSession={session?.user} />
            </div>
          ) : (
            <div className="mx-2">
              <TnumberOfQuiz userSession={session?.user} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
