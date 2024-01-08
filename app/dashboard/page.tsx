//"use client"
import { DashboardCards } from "@/components/Cards/DashboardCards"
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"



export default async function Dashboard() {
  /*  const { data: session, status } = useSession()
   console.log(status)
   if (status === "authenticated") {
     console.log(session)
   } */
  const session = await getServerSession(config);
  console.log(session)
  return (
    <>
      <div className="">

        <h1>Dashboard</h1>

        <div className="flex flex-row">
          <DashboardCards />
        </div>

      </div>

    </>
  )
}

