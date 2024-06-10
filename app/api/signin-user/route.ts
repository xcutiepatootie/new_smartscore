import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'


type reqBody = {
    email: string
    password: string
    userRole: string
}

export async function POST(req: Request) {
    try {
        const reqBody = await req.json()
        const { email, password, role } = reqBody
        console.log(reqBody)

        if (!email || !password) {
            return new Response('Missing Info', { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        console.log(user)



        if (user && (await bcrypt.compare(reqBody.password, user.password))) {
            console.log("Good")
            return new Response(JSON.stringify(user), { status: 200, statusText: "User Successfully Signed In" })
        } else {
            return new Response('Invalid Email or Password', { status: 401 })
        }

    } catch (error: any) {
        // console.log(error, 'Error Signing in')
        return new Response('Internal Error', { status: 500 })

    }

}

