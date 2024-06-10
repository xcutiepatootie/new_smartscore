import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {

    try {
        const quizzes = await prisma.quiz.findMany()
        const quizzesCount: number = await prisma.quiz.count()


        const formattedResponse = {
            quizzes: quizzes.map((quiz) => ({
                id: quiz.id,
                name: quiz.quizName,
                subject: quiz.subject,
                facultyId: quiz.facultyId
            })),
            quizCount: quizzesCount
        };

        if (formattedResponse) {
           // console.log(formattedResponse)
            revalidatePath('/dashboard')
            return new Response(JSON.stringify(formattedResponse), { status: 200, statusText: "Test" })
        } else {
            return new Response('Failed To Fetch', { status: 401 })
        }

    } catch (error) {
        console.log(error)
        return new Response('Internal Error', { status: 500 });
    }
}




