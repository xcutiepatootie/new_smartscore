//"use client"
import Quiz_DateAdded from "@/components/Cards/Dashboard/Faculty/Quiz_DateAdded";
import Quiz_Section from "@/components/Cards/Dashboard/Faculty/Quiz_Section/Quiz_Section";
import TnumberOfQuiz from "@/components/Cards/Dashboard/TnumberOfQuiz";
import TnumberOfQuizCreatedByUser from "@/components/Cards/Dashboard/Faculty/TnumberOfQuizCreatedByUser";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import {
  getQuizzesList_faculty,
  quizSection_Card,
} from "@/lib/server_actions/actions";
import { QuizData_Cards } from "@/types/types";
import Subjects_Handled_Card from "@/components/Cards/Dashboard/Faculty/Subjects_Handled_Card";
export default async function Dashboard() {
  /*  const { data: session, status } = useSession()
   console.log(status)
   if (status === "authenticated") {
     console.log(session)
   } */
  const session = await getServerSession(config);
  const quizzes = await quizSection_Card();

  console.log(quizzes);

  return (
    <>
      <div className="flex flex-row h-full max-sm:flex=col">
        {session?.user.role === "faculty" ? (
          <div className="mx-2 space-y-4">
            <div className="flex flex-row space-x-2">
              <TnumberOfQuizCreatedByUser userSession={session?.user} />
              <Subjects_Handled_Card userSession={session?.user} />
              <TnumberOfQuizCreatedByUser userSession={session?.user} />
              <TnumberOfQuizCreatedByUser userSession={session?.user} />
            </div>

            <div className="flex flex-row space-x-2 h-[700px]">
              <Quiz_Section quizzes={quizzes} />
              <Quiz_DateAdded />
            </div>
          </div>
        ) : (
          <div className="mx-2">
            <div className="flex flex-row">
              <TnumberOfQuiz userSession={session?.user} />
              <TnumberOfQuiz userSession={session?.user} />
              <TnumberOfQuiz userSession={session?.user} />
              <TnumberOfQuiz userSession={session?.user} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
