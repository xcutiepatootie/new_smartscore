import { Add_List_Quiz } from "@/components/Quizzes/Add_List_Quiz";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { config } from "@/lib/auth";
import {
  getQuizzesList_faculty,
  getQuizzesList_student,
  getSections,
} from "@/lib/server_actions/actions";

const Quizzes = async () => {
  const getSession = await getServerSession(config);
  const userSection = getSession?.user.userSection;

  let allQuiz;
  if (getSession?.user.role === "faculty") {
    allQuiz = await getQuizzesList_faculty();
  }
  if (getSession?.user.role === "student") {
    allQuiz = await getQuizzesList_student();
  }

  const allSection = await getSections();
  //console.log(allSection)

  // console.log(JSON.stringify(allQuiz.getAllQuizzes, null, 2));

  return (
    <>
      <Add_List_Quiz
        quizList={allQuiz?.getAllQuizzes}
        quizTaken={allQuiz?.getAllTakenQuiz}
        studentSection={allSection}
      />
    </>
  );
};

export default Quizzes;
