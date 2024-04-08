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
      <div className="flex h-full flex-row p-2 px-2 max-sm:grid max-sm:grid-rows-2">
        {session?.user.role === "faculty" ? (
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <div className="flex flex-row max-lg:w-full max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:space-y-6  md:space-x-4">
              <div className="flex flex-row space-x-4 max-md:flex-col max-md:items-center max-md:justify-center">
                {session?.user.initialLogin ? (
                  <div className="">
                    <Label
                      className={`${margarine.className} text-center text-6xl`}
                    >
                      Welcome, <br />
                      <span className="capitalize">{session?.user.name}!</span>
                    </Label>
                  </div>
                ) : (
                  <div className="flex w-1/4 items-center justify-center">
                    <Label
                      className={`${margarine.className} text-center text-6xl`}
                    >
                      Welcome back, <br />
                      <span className="capitalize">{session?.user.name}!</span>
                    </Label>
                  </div>
                )}
                <Subjects_Handled_Card userSession={session?.user} />
                <TnumberOfQuizCreatedByUser userSession={session?.user} />
                <SectionsHandled_Card />
              </div>
            </div>

            <div className="flex h-[650px] w-full flex-row space-x-2 px-6 max-sm:flex-col">
              <Quiz_Section quizzes={quizzes} />
              <Quiz_DateAdded />
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col justify-between space-y-4 p-4">
            <div className="flex flex-row max-lg:w-full max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:space-y-6 max-lg:p-2 md:space-x-4">
              <div className="flex w-full flex-row items-center justify-between space-x-4 px-8 max-md:flex-col max-md:justify-center">
                {session?.user.initialLogin ? (
                  <div className="">
                    <Label
                      className={`${margarine.className} text-center text-6xl`}
                    >
                      Welcome, <br />
                      <span className="capitalize">{session?.user.name}!</span>
                    </Label>
                  </div>
                ) : (
                  <div className="flex w-1/4 items-center justify-center">
                    <Label
                      className={`${margarine.className} text-center text-6xl`}
                    >
                      Welcome back, <br />
                      <span className="capitalize">{session?.user.name}!</span>
                    </Label>
                  </div>
                )}
                <TnumberOfQuiz userSession={session?.user} />
                <TnumberOfUnfinishedQuiz />
                <CompletedQuizzes_Card />
              </div>
            </div>
            <div className="flex h-[700px] w-full flex-row space-x-2 px-4 max-sm:flex-col">
              {quizNames ? (
                <Ranking_Card quizNames={quizNames} />
              ) : (
                <>Not yet Ready</>
              )}
              <Quiz_DateAdded />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
