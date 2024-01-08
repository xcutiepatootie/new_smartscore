import prisma from '@/lib/prisma'

type FacultyData = {
    email: string,
    name: string,
}

export async function POST(req: Request) {
    try {
        const reqBody = await req.json()
        const { quizData } = reqBody
        const { facultyId } = reqBody.quizData
        console.log(quizData)

        const facultyData = await prisma.faculty.findUnique({
            where: {
                id: facultyId,
            },
            select: {
                email: true,
                name: true,
            }
        })

        if (!facultyData) {
            console.error('Faculty not found for the given ID');
            return new Response('Faculty not found', { status: 404 });
        }
        console.log("Faculty Data", facultyData)

        const { name: _facultyName } = facultyData

        const createdQuiz = await prisma.quiz.create({
            data: {
                name: quizData.quizName,
                subject: quizData.subject,
                faculty: {
                    connect: { id: facultyId }, // Connect the Quiz to a specific Faculty
                },
                facultyName: _facultyName,
                questions: {
                    create: quizData.questions.map((question: { text: any; options: any; answers: any; }, index: any) => ({

                        questionText: question.text,
                        options: { set: Array.isArray(question.options) ? question.options : [question.options] },
                        correctAnswers: { set: Array.isArray(question.answers) ? question.answers : [question.answers] },
                        facultyId: facultyId, // Replace with the actual faculty ID
                        facultyName: _facultyName,
                        questionIndex: (index + 1).toString(), // Add the questionIndex field with the current index + 1

                        // You can adjust the above fields as per your Prisma model definition
                    })),
                },

            }, include: { faculty: true }

        });

        //console.log("Creator Name: ",createdQuiz.faculty.name)

        console.log("Created Quiz: ", createdQuiz)
        return new Response("Success", { status: 200, statusText: "User Successfully Created" })


    } catch (error: any) {
        console.log(error, 'Error ')
        return new Response('Internal Error', { status: 500 })

    }

}

