import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Session } from "next-auth"



async function getData() {
    const responseData = await fetch('http://localhost:3000/api/getlistquiz', { method: 'POST', next: { revalidate: 10 } })

    if (!responseData.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await responseData.json()

    console.log("Test DATA:", data)

    return data
}


export async function ProfileCards({ user }: any) {
    const data = await getData()
    return (
        <div>
            <Card className="w-[83vw]">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Name: {user.name}</p>
                </CardContent>
                <CardContent>
                    <p>Email: {user.email}</p>
                </CardContent>
                <CardContent>
                    <p>Username: {user.username}</p>
                </CardContent>
                <CardContent>
                    <p>TBA: </p>
                </CardContent>
                <CardContent>
                    <p>TBA: </p>
                </CardContent>

                <CardFooter>
                    <p></p>
                </CardFooter>
            </Card>



        </div>
    )
}

export default ProfileCards