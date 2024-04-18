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
import AdminPanel from "@/components/admin/AdminPanel";
export default async function Dashboard() {
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
        <div className="grid h-full grid-cols-1 gap-4 md:grid-rows-2 md:p-4 lg:grid-rows-4">
          <div className="flex flex-col items-center justify-center space-y-2 max-md:p-4 max-sm:pt-4 md:space-x-4 xl:flex-row">
            {session?.user.initialLogin ? (
              <Label
                className={`${margarine.className} flex h-full w-full flex-col items-center justify-center text-center text-3xl md:text-4xl`}
              >
                Welcome, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            ) : (
              <Label
                className={`${margarine.className} flex h-full w-full flex-col items-center justify-center text-center text-3xl md:text-4xl`}
              >
                Welcome back, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            )}
            <Subjects_Handled_Card userSession={session?.user} />
            <TnumberOfQuizCreatedByUser userSession={session?.user} />
            <SectionsHandled_Card />
          </div>
          <div className="flex flex-col items-center justify-center max-md:space-y-4 max-md:p-4 md:w-full md:space-x-2 lg:row-span-4 lg:grid lg:grid-cols-2">
            <Quiz_Section quizzes={quizzes} />
            <Quiz_DateAdded />
          </div>
        </div>
      ) : session?.user.role === "admin" ? (
        <div className="">
          <AdminPanel />
          <h1>Test</h1>
        </div>
      ) : (
        <div className="grid h-full grid-cols-1 gap-4 md:grid-rows-2 md:p-4 lg:grid-rows-4">
          <div className="flex flex-col items-center justify-center space-y-2 max-md:p-4 max-sm:pt-4 md:space-x-4 xl:flex-row">
            {session?.user.initialLogin ? (
              <Label
                className={`${margarine.className} flex h-full w-full flex-col items-center justify-center text-center text-3xl md:text-4xl`}
              >
                Welcome, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            ) : (
              <Label
                className={`${margarine.className} flex h-full w-full flex-col items-center justify-center text-center text-3xl md:text-4xl`}
              >
                Welcome back, <br />
                <span className="capitalize">{session?.user.name}!</span>
              </Label>
            )}
            <TnumberOfQuiz userSession={session?.user} />
            <TnumberOfUnfinishedQuiz />
            <CompletedQuizzes_Card />
          </div>

          <div className="flex flex-col items-center justify-center max-lg:space-y-2 max-md:p-4 md:w-full lg:row-span-4 xl:grid xl:grid-cols-2 xl:gap-2">
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
