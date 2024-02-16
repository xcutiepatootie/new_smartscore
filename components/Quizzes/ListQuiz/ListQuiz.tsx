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

  console.log("List", quizList);
  console.log("Taken", quizTaken);

  const isQuizTaken = (quizId: any, studentId: any) => {
    // Find if quizId exists in quizTaken array
    return quizTaken.some(
      (takenQuiz: any) =>
        takenQuiz.quizId === quizId && takenQuiz.studentId === studentId
    );
  };

  // Filter out quizTaken data with isDone === true
  const filteredQuizTaken = quizTaken.filter(
    (takenQuiz: any) =>
      takenQuiz.isDone && session?.user.id === takenQuiz.studentId
  );

  // Filter out quizTaken data with isDone === false
  const filteredQuizTaken_NotDone = quizTaken.filter(
    (takenQuiz: any) =>
      !takenQuiz.isDone && session?.user.id === takenQuiz.studentId
  );

  console.log("Completed: ", filteredQuizTaken);

  const checkAllQuizinQuizTakenByUser = quizList.map((quiz: Quiz) => {
    return isQuizTaken(quiz.id, session?.user.id);
  });

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
          {quizList.map((quiz: Quiz, index: number) => {
            const isNotTakenOrNotDone =
              !isQuizTaken(quiz.id, session?.user.id) ||
              (isQuizTaken(quiz.id, session?.user.id) &&
                !filteredQuizTaken.find(
                  (takenQuiz: any) => takenQuiz.quizId === quiz.id
                )?.isDone);
            if (isNotTakenOrNotDone) {
              return (
                <tr key={quiz.id} className="border-b border-gray-200">
                  <td className="px-6 py-4">{quiz.quizName}</td>
                  <td className="px-6 py-4">{quiz.subject}</td>
                  {session?.user.role === "student" ? (
                    <td className="px-6 py-4 text-center">
                      {" "}
                      {checkAllQuizinQuizTakenByUser[index] ? (
                        <>
                          <span>
                            Number of Retries Left:{" "}
                            {checkAllQuizinQuizTakenByUser[index] &&
                              filteredQuizTaken_NotDone.find(
                                (takenQuiz: any) => takenQuiz.quizId === quiz.id
                              )?.retriesLeft }
                          </span>
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
                        <>
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
                        </>
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
                            const delQuiz = await deleteQuiz(quiz.id);
                          }}
                        >
                          Delete Quiz
                        </button>
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
