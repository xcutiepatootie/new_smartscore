import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const reqBody = await req.json();
        const { quizId } = reqBody;

        const quiz = await prisma.quiz.findFirst({
            where: {
                id: quizId,
            },
            include: {
                questions: true,
            },
        });

        if (quiz) {
            const formattedResponse = {
                quiz: {
                    id: quiz.id,
                    name: quiz.quizName,
                    subject: quiz.subject,
                    questions: quiz.questions.map((question) => ({
                        id: question.id,
                        questionText: question.questionText,
                        options: question.options,
                        correctAnswers: question.correctAnswer,
                    })),
                },
            };

            console.log(formattedResponse); // Print formattedResponse

            return new Response(JSON.stringify(formattedResponse), {
                status: 200,
                statusText: 'Success',
            });
        } else {
            return new Response('Quiz not found', { status: 404 });
        }
    } catch (error) {
        console.error('Internal Error:', error);
        return new Response('Internal Error', { status: 500 });
    }
}
