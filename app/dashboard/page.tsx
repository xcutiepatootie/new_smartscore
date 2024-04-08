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
  getQuizNames,
  getQuizzesList_faculty,
  quizSection_Card,
  updateInitialLogin,
} from "@/lib/server_actions/actions";
import { QuizData_Cards } from "@/types/types";
import Subjects_Handled_Card from "@/components/Cards/Dashboard/Faculty/Subjects_Handled_Card";
import { Label } from "@/components/ui/label";
import { margarine } from "@/utils/fonts";
import Ranking_Card from "@/components/Cards/Dashboard/Student/Ranking_Card";
import CompletedQuizzes_Card from "@/components/Cards/Dashboard/Student/CompletedQuizzes_Card";
import TnumberOfUnfinishedQuiz from "@/components/Cards/Dashboard/Student/TnumberOfUnfinishedQuiz";
import SectionsHandled_Card from "@/components/Cards/Dashboard/Faculty/SectionsHandled_Card";
export default async function Dashboard() {
  /*  const { data: session, status } = useSession()
   console.log(status)
   if (status === "authenticated") {
     console.log(session)
   } */
  const session = await getServerSession(config);
  const quizzes = await quizSection_Card();

  if (session?.user.initialLogin) {
    const updateInitialLoginValue = await updateInitialLogin();
  }

  let quizNames;
  if (session?.user.role === "student") {
    quizNames = await getQuizNames();
    console.log(quizNames);
  }

  console.log(quizzes);

  return (
    <>
      {session?.user.role === "faculty" ? (
        <div className="grid h-full grid-cols-1 gap-4 md:grid-rows-4 md:p-4">
          <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-x-4">
            {session?.user.initialLogin ? (
              <Label
                className={`${margarine.className} mt-12 text-center text-5xl md:text-6xl`}
              >
                Welcome, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            ) : (
              <Label
                className={`${margarine.className} mt-12 text-center text-5xl md:text-6xl`}
              >
                Welcome back, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            )}
            <Subjects_Handled_Card userSession={session?.user} />
            <TnumberOfQuizCreatedByUser userSession={session?.user} />
            <SectionsHandled_Card />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 md:row-span-4 md:w-full md:flex-row md:space-x-2">
            <Quiz_Section quizzes={quizzes} />
            <Quiz_DateAdded />
          </div>
        </div>
      ) : (
        <div className="grid h-full grid-cols-1 gap-4 md:grid-rows-4 md:p-4">
          <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-x-4">
            {session?.user.initialLogin ? (
              <Label
                className={`${margarine.className} mt-12 text-center text-5xl md:text-6xl`}
              >
                {" "}
                Welcome, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            ) : (
              <Label
                className={`${margarine.className} mt-12 text-center text-5xl md:text-6xl`}
              >
                {" "}
                Welcome back, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            )}
            <TnumberOfQuiz userSession={session?.user} />
            <TnumberOfUnfinishedQuiz />
            <CompletedQuizzes_Card />
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 md:row-span-4 md:w-full md:flex-row md:space-x-2">
            {quizNames ? (
              <Ranking_Card quizNames={quizNames} />
            ) : (
              <>Not yet Ready</>
            )}
            <Quiz_DateAdded />
          </div>
        </div>
      )}
    </>
  );
}
