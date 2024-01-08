
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()
  if (session) {
    console.log(session.user.id)
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Landing Page</h1>
      </div>
    </div>
  )
}
