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

  let allQuiz: any;
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
    <div className="flex items-center justify-center">
      <Add_List_Quiz
        quizList={
          getSession?.user.role === "faculty"
            ? allQuiz?.getAllQuizzes
            : allQuiz?.quizzesBasedOnSection
        }
        quizTaken={allQuiz?.getAllTakenQuiz}
        studentSection={allSection}
      />
    </div>
  );
};

export default Quizzes;
