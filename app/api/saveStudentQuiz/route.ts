import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        //Pass the student score from application
        const reqBody = await req.json();
        const { quizId, studentAnswers, time, studentId, studentName, answerChanges } = reqBody;

        //convert time to hh:mm:ss format
        const seconds = time % 60;
        const minutes = Math.floor((time / 60) % 60);
        const hours = Math.floor(time / 3600);

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;




        if (!reqBody) {
            return new Response('Missing Data', { status: 400 });
        }

        // Find quiz base from the request body
        const quiz = await prisma.quiz.findFirst({
            where: {
                id: quizId,
            },
            include: {
                questions: true,
            },
        });
        // Check if the quiz is existing
        if (quiz) {
            const formattedResponse = {
                quiz: {
                    id: quiz.id,
                    name: quiz.name,
                    subject: quiz.subject,
                    questions: quiz.questions.map((question) => ({
                        id: question.id,
                        questionIndex: question.questionIndex,
                        questionText: question.questionText,
                        options: question.options,
                        correctAnswers: question.correctAnswers.join(),
                    })),
                },
            };



            const newCorrectAnswers = formattedResponse.quiz.questions.map((question) => question.correctAnswers).flat();



            const quiz_Name = quiz?.name

            const existingScore = await prisma.score.findFirst({
                where: {
                    studentId: studentId,
                    quizId: quizId,
                },
                include: {
                    student: true,
                    quiz: true,
                },
            });

            console.log("Test", existingScore)

            if (existingScore) {
                let score = 0;
                for (let i = 0; i < newCorrectAnswers.length; i++) {
                    if (studentAnswers[i] === newCorrectAnswers[i]) {
                        score += 1;
                    }
                }

                const updatedScore = await prisma.score.update({
                    where: {
                        id: existingScore.id,
                    },
                    data: {
                        userAnswers: studentAnswers,
                        timeSeconds: time,
                        quizName: existingScore.quiz.name,
                        studentName: existingScore.student.name,
                        timeStr: formattedTime,
                        score: score,
                        answerClicked: answerChanges
                    },
                });

            } else {
                let score = 0;
                for (let i = 0; i < newCorrectAnswers.length; i++) {
                    if (studentAnswers[i] === newCorrectAnswers[i]) {
                        score += 1;
                    }
                }

                const newScore = await prisma.score.create({
                    data: {
                        student: { connect: { id: studentId } },
                        studentName: studentName,
                        quiz: { connect: { id: quizId } },
                        score: score,
                        userAnswers: studentAnswers,
                        timeSeconds: time,
                        timeStr: formattedTime,
                        quizName: quiz_Name,
                        answerClicked: answerChanges
                    },
                });

            }
        }

        return new Response('Response Successfully Saved ', {
            status: 200,
            statusText: 'Response Successfully Saved',
        });

    } catch (error: any) {
        console.error('Error:', error);
        return new Response('Internal Error', { status: 500 });
    }
}