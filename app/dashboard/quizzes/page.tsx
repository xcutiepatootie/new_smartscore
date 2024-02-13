import { Add_List_Quiz } from "@/components/Quizzes/Add_List_Quiz"
import prisma from "@/lib/prisma"




const Quizzes = async () => {

    async function getQuizzes() {
        "use server"
        const getAllQuizzes = await prisma.quiz.findMany(
            {
                include: { questions: true }
            }
        )
        return getAllQuizzes
    }

    const allQuiz = await getQuizzes()

    console.log(JSON.stringify(allQuiz, null, 2))


    return (
        <>
            <Add_List_Quiz quizList={allQuiz}/>
        </>
    )
}

export default Quizzes