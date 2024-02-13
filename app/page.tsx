
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession()
  if (session) {
    console.log(session.user.id)
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row">
        <div>
          <Image src={'/1.png'} alt="HAHA" width={500} height={250}/>
        </div>
        <div>
          <h1>Landing page</h1>

        </div>
      </div>
    </div>
  )
}
