import { Add_List_Quiz } from "@/components/Quizzes/Add_List_Quiz";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { config } from "@/lib/auth";
import { getSections } from "@/lib/server_actions/actions";

const Quizzes = async () => {
  const getSession = await getServerSession(config);
  const userSection = getSession?.user.userSection;
  
  

  async function getQuizzes() {
    "use server";
    const getAllQuizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });

    console.log(getAllQuizzes);
    const { section }: any = userSection;
    console.log("HAHA", section);

    //Filter Quiz Data base from Current Section
    const quizzesBasedOnSection = getAllQuizzes.filter(quiz => quiz.sectionAssigned.includes(section));
    console.log("Filtered:",quizzesBasedOnSection);


    const getQuizzesCount = await prisma.quiz.count();
    const getQuizzesTakenCountByUser = await prisma.quizTaken.count({
      where: {
        studentId: getSession?.user.id,
        isDone: true,
      },
    });

    const formatCount = { getQuizzesCount, getQuizzesTakenCountByUser };

    console.log(getQuizzesCount, getQuizzesTakenCountByUser);

    const getAllTakenQuiz = await prisma.quizTaken.findMany({});
    return { getAllQuizzes, getAllTakenQuiz, formatCount, quizzesBasedOnSection };
  }

  const allQuiz = await getQuizzes();
  const allSection = await getSections();
  //console.log(allSection)

  // console.log(JSON.stringify(allQuiz.getAllQuizzes, null, 2));

  return (
    <>
      <Add_List_Quiz
        quizList={allQuiz.quizzesBasedOnSection}
        quizTaken={allQuiz.getAllTakenQuiz}
        studentSection={allSection}
      />
    </>
  );
};

export default Quizzes;
