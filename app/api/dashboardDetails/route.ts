import prisma from '@/lib/prisma'


export async function POST(req: Request) {

    try {
        const quizzesCount: number = await prisma.quiz.count()
        const answeredQuizzes = await prisma.quiz.findMany({
            select:{
                _count:{
                    select:{
                        scores:{ where: {studentId:}}
                    }
                }
            }
                
        })


        const formattedResponse = {
            quizzes: quizzes.map((quiz) => ({
                id: quiz.id,
                name: quiz.name,
                subject: quiz.subject,
                count: quizzesCount
            })),
        };

        if (formattedResponse) {
            console.log(formattedResponse)
            return new Response(JSON.stringify(formattedResponse), { status: 200, statusText: "Test" })
        } else {
            return new Response('Failed To Fetch', { status: 401 })
        }

    } catch (error) {
        return new Response('Internal Error', { status: 500 })
    }




}