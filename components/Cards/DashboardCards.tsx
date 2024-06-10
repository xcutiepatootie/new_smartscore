import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

async function getData() {
    const responseData = await fetch('http://localhost:3000/api/getlistquiz', { method: 'POST', next: { revalidate: 10 } })

    if (!responseData.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await responseData.json()

    console.log("Test DATA:", data)
  
    return data
}


export async function DashboardCards() {
    const data = await getData()
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Total Number of Quiz</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Quiz Count: {data.quizCount}</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Total Number of Quiz</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Quiz Count: {data.quizCount}</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default DashboardCards