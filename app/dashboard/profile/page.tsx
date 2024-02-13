import { ProfileCards } from "@/components/Cards/ProfileCards"
import { config } from "@/lib/auth"
import { Session, User, getServerSession } from "next-auth"



const Profile = async () => {
    const sessionUser = await getServerSession(config)


    if (!sessionUser) {
        return null
    }
    return (
        <>
            <div className="flex">

                <div className=''>

                    <ProfileCards user={sessionUser.user} />

                </div>
            </div>
        </>
    )
}

export default Profile