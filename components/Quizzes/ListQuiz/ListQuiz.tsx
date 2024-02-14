"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteQuiz } from "@/lib/server_actions/actions";
import { Quiz } from "@prisma/client";

const ListQuiz = ({ quizList, quizTaken, quizCount_Taken }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(quizCount_Taken)

  if(quizCount_Taken.getQuizzesCount === quizCount_Taken.getQuizzesTakenCountByUser){
    return <div>No Quiz Available</div>
  } 

  return (
    <div className="w-full">
      <table className="w-full bg-white border border-gray-200">
        <thead className="">
          <tr className="bg-gray-100 ">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Subject</th>
            <th className="px-6 py-4 text-center">Option</th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((quiz: Quiz) => {
            const quizTakenForCurrentQuiz = quizTaken.find(
              (qt: any) => qt.quizId === quiz.id
            );

            const retriesLeft = quizTakenForCurrentQuiz
              ? quizTakenForCurrentQuiz.retriesLeft
              : 0;

            // Check if the user is a student and if retries are left
            const showRetryButton =
              session?.user.role === "student" && retriesLeft > 0;

            // Check if isPerfect is true
            const isPerfect =
              quizTakenForCurrentQuiz &&
              quizTakenForCurrentQuiz.isPerfect === true;

            // Render the row conditionally based on retries left
            console.log(
              quizTakenForCurrentQuiz,
              retriesLeft,
              showRetryButton,
              isPerfect
            );
            return (
              retriesLeft >= 0 &&
              isPerfect && (
                <tr key={quiz.id} className="border-b border-gray-200">
                  <td className="px-6 py-4">{quiz.quizName}</td>
                  <td className="px-6 py-4">{quiz.subject}</td>
                  {/* Render either retry button or take quiz button */}
                  {session?.user.role === "student" ? (
                    <td className="px-6 py-4 text-center">
                      {showRetryButton ? (
                        <>
                          <span>Number of Retries Left: {retriesLeft}</span>
                          <button
                            className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ml-4"
                            onClick={() =>
                              router.push(
                                `/dashboard/quizzes/take-quiz?quizId=${quiz.id}`
                              )
                            }
                          >
                            Retry Quiz
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200"
                          onClick={() =>
                            router.push(
                              `/dashboard/quizzes/take-quiz?quizId=${quiz.id}`
                            )
                          }
                        >
                          Take Quiz
                        </button>
                      )}
                    </td>
                  ) : (
                    <td className="flex items-center justify-center px-6 py-4 text-center">
                      <div className="mx-2">
                        <button
                          className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200"
                          onClick={() =>
                            router.push(
                              `/dashboard/quizzes/update-quiz?quizId=${quiz.id}`
                            )
                          }
                        >
                          Update Quiz
                        </button>
                      </div>
                      <div className="mx-2">
                        <button
                          className="bg-red-400 text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ml-4"
                          onClick={async () => {
                            const delQuiz = await deleteQuiz(quizList.id);
                          }}
                        >
                          Delete Quiz
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Export the component
export default ListQuiz;
