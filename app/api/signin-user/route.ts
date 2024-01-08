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
        const { email, password, userRole } = reqBody
        console.log(reqBody)

        if (!email || !password || !userRole) {
            return new Response('Missing Info', { status: 400 })
        }

        let user
        switch (userRole) {

            case 'faculty':
                user = await prisma.faculty.findFirst({
                    where: {
                        email: reqBody.email,

                        role: reqBody.userRole

                    }
                })
                break
            case 'student':
                user = await prisma.student.findFirst({
                    where: {
                        email: reqBody.email,

                        role: reqBody.userRole

                    }
                })
                break
            default:
                break
        }





        if (user && (await bcrypt.compare(reqBody.password, user.hashedPassword))) {
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

