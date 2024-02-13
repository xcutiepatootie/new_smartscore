"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteQuiz } from "@/lib/server_actions/actions";
import { Quiz } from "@prisma/client";

const ListQuiz = ({ quizList }: any) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  /* useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.post<QuizzesResponse>('/api/getlistquiz');
                setQuizzes(response.data.quizzes);
                console.log(quizzes)
            } catch (error) {
                console.error('Failed to fetch quizzes', error);
            }
        };

        fetchQuizzes();
    }, []); */

  const handleTakeQuiz = (quizId: string) => {
    console.log("Quiz ID:", quizId);
    // Perform any additional actions with the quiz ID here
    // router.push(`/quizzes/${quizId}`)
  };

  return (
    /*       <>
                  <Table>
                      <TableCaption>A list of your recent invoices.</TableCaption>
                      <TableHeader>
                          <TableRow>
                              <TableHead className="w-[100px]">Invoice</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          <TableRow>
                              <TableCell className="font-medium">INV001</TableCell>
                              <TableCell>Paid</TableCell>
                              <TableCell>Credit Card</TableCell>
                              <TableCell className="text-right">$250.00</TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
              </> */

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
          {quizList.map((quiz: Quiz) => (
            <tr key={quiz.id} className="border-b border-gray-200">
              <td className="px-6 py-4">{quiz.quizName}</td>
              <td className="px-6 py-4">{quiz.subject}</td>
              {session?.user.role === "student" ? (
                <td className="px-6 py-4 text-center">
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
                  <span className="mx-8">Number of Retries Left: </span>
                </td>
              ) : (
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/quizzes/update-quiz?quizId=${quiz.id}`
                      )
                    }
                    className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold mx-4 py-2 px-4 rounded transition-all duration-200"
                  >
                    Edit Quiz
                  </button>
                  <button
                    onClick={async () => {
                      await deleteQuiz(quiz.id);
                    }}
                    className="bg-red-400 text-black hover:bg-violet-500 hover:text-white font-bold mx-4 py-2 px-4 rounded transition-all duration-200"
                  >
                    Delete Quiz
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListQuiz;
