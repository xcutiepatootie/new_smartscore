"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteQuiz } from "@/lib/server_actions/actions";
import { Quiz } from "@prisma/client";
import Delete_Quiz from "../Delete_Quiz/Delete_Quiz";
import { RiEdit2Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { MdRefresh } from "react-icons/md";
import { RiBrainFill } from "react-icons/ri";
import { lexend } from "@/utils/fonts";
import { Separator } from "@/components/ui/separator";
import { MdQuiz } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { FiCheckCircle } from "react-icons/fi";

const ListQuiz = ({ quizList, quizTaken }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("List", quizList);
  console.log("Taken", quizTaken);

  const isQuizTaken = (quizId: any, studentId: any) => {
    // Find if quizId exists in quizTaken array
    return quizTaken.some(
      (takenQuiz: any) =>
        takenQuiz.quizId === quizId && takenQuiz.studentId === studentId,
    );
  };

  // Filter out quizTaken data with isDone === true
  const filteredQuizTaken = quizTaken.filter(
    (takenQuiz: any) =>
      takenQuiz.isDone && session?.user.id === takenQuiz.studentId,
  );

  // Filter out quizTaken data with isDone === false
  const filteredQuizTaken_NotDone = quizTaken.filter(
    (takenQuiz: any) =>
      !takenQuiz.isDone && session?.user.id === takenQuiz.studentId,
  );

  console.log("Completed: ", filteredQuizTaken);

  const checkAllQuizinQuizTakenByUser = quizList.map((quiz: Quiz) => {
    return isQuizTaken(quiz.id, session?.user.id);
  });

  let notTakenOrNotDoneCount = 0;

  const test = quizList.map((quiz: Quiz, index: number) => {
    const isNotTakenOrNotDone =
      !isQuizTaken(quiz.id, session?.user.id) ||
      (isQuizTaken(quiz.id, session?.user.id) &&
        !filteredQuizTaken.find(
          (takenQuiz: any) => takenQuiz.quizId === quiz.id,
        )?.isDone);
    if (isNotTakenOrNotDone) {
      notTakenOrNotDoneCount++;
    }
  });

  return (
    <div className="w-full">
      {session?.user?.role === "student" && (
        <div className="flex flex-row items-center justify-evenly p-2">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-row items-center justify-center space-x-4">
              <MdQuiz size={50} className="text-amber-700 " />
              <Label className={`${lexend.className} text-4xl`}>
                {notTakenOrNotDoneCount}
              </Label>
            </div>
            <Label className={`${lexend.className} text-2xl`}>
              Available Quizzes
            </Label>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-row items-center justify-center space-x-4">
              <FiCheckCircle size={50} className="text-amber-700" />
              <Label className="text-4xl">{filteredQuizTaken.length}</Label>
            </div>
            <Label className={`${lexend.className} text-2xl`}>Finished</Label>
          </div>
        </div>
      )}
      <Separator className="my-2 h-1 bg-yellow-800" />
      <table className="w-full border border-gray-200 bg-white">
        <thead className="bg-yellow-200">
          <tr className=" ">
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Subject</th>
            {session?.user?.role === "faculty" && (
              <th className="px-6 py-4 text-left">Quiz Code</th>
            )}
            <th className="px-6 py-4 text-center">Option</th>
          </tr>
        </thead>
        <tbody className="bg-yellow-50">
          {quizList.map((quiz: Quiz, index: number) => {
            const isNotTakenOrNotDone =
              !isQuizTaken(quiz.id, session?.user.id) ||
              (isQuizTaken(quiz.id, session?.user.id) &&
                !filteredQuizTaken.find(
                  (takenQuiz: any) => takenQuiz.quizId === quiz.id,
                )?.isDone);
            if (isNotTakenOrNotDone) {
              return (
                <tr key={quiz.id} className="border-b border-gray-200">
                  <td className="px-6 py-4">{quiz.quizName}</td>
                  <td className="px-6 py-4">{quiz.subject}</td>
                  {session?.user?.role === "faculty" && (
                    <td className="px-6 py-4">{quiz.quizCode}</td>
                  )}
                  {session?.user.role === "student" ? (
                    <td className="px-6 py-4 text-center">
                      {checkAllQuizinQuizTakenByUser[index] ? (
                        <>
                          <span className={`${lexend.className}`}>
                            Number of Retries Left:{" "}
                            {checkAllQuizinQuizTakenByUser[index] &&
                              filteredQuizTaken_NotDone.find(
                                (takenQuiz: any) =>
                                  takenQuiz.quizId === quiz.id,
                              )?.retriesLeft}
                          </span>
                          <Button
                            className="ml-4 rounded bg-amber-500 px-4 py-2 font-bold text-black transition-all duration-200 hover:bg-amber-600 hover:text-white"
                            onClick={() =>
                              router.push(
                                `/dashboard/quizzes/take-quiz?quizId=${quiz.id}`,
                              )
                            }
                          >
                            <span className="mr-2">
                              <MdRefresh size={25} />
                            </span>
                            Retry Quiz
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="rounded bg-amber-500 px-4 py-2 font-bold text-black transition-all duration-200 hover:bg-amber-600 hover:text-white"
                            onClick={() =>
                              router.push(
                                `/dashboard/quizzes/take-quiz?quizId=${quiz.id}`,
                              )
                            }
                          >
                            <span className="mr-2">
                              <RiBrainFill size={25} />
                            </span>
                            Take Quiz
                          </Button>
                        </>
                      )}
                    </td>
                  ) : (
                    <td className="flex items-center justify-center px-6 py-4 text-center">
                      <div className="mx-2">
                        <Button
                          className="rounded bg-amber-300 px-4 py-2 font-bold text-black transition-all duration-200 hover:bg-yellow-600 hover:text-white"
                          onClick={() =>
                            router.push(
                              `/dashboard/quizzes/update-quiz?quizId=${quiz.id}`,
                            )
                          }
                        >
                          <span className="mr-2">
                            <RiEdit2Fill size={25} />
                          </span>
                          Update Quiz
                        </Button>
                      </div>
                      <div className="mx-2">
                        {/*   <button
                          className="bg-red-400 text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ml-4"
                          onClick={async () => {
                            const delQuiz = await deleteQuiz(quiz.id);
                          }}
                        >
                          Delete Quiz
                        </button> */}
                        <Delete_Quiz quizId={quiz.id} />
                      </div>
                    </td>
                  )}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

// Export the component
export default ListQuiz;
