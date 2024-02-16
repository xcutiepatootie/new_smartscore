import { Add_List_Quiz } from "@/components/Quizzes/Add_List_Quiz";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { config } from "@/lib/auth";

const Quizzes = async () => {
  const getSession = await getServerSession(config);

  async function getQuizzes() {
    "use server";
    const getAllQuizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });

    const getQuizzesCount = await prisma.quiz.count();
    const getQuizzesTakenCountByUser = await prisma.quizTaken.count({
      where: {
        studentId: getSession?.user.id,
        isPerfect: true,
      },
    });

    const formatCount = { getQuizzesCount, getQuizzesTakenCountByUser };

    console.log(getQuizzesCount, getQuizzesTakenCountByUser);

    const getAllTakenQuiz = await prisma.quizTaken.findMany({});
    return { getAllQuizzes, getAllTakenQuiz, formatCount };
  }

  const allQuiz = await getQuizzes();

  // console.log(JSON.stringify(allQuiz.getAllQuizzes, null, 2));

  return (
    <>
      <Add_List_Quiz
        quizList={allQuiz.getAllQuizzes}
        quizTaken={allQuiz.getAllTakenQuiz}
        quizCount_Taken={allQuiz.formatCount}
      />
    </>
  );
};

export default Quizzes;
