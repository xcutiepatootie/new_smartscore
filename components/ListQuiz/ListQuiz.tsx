import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


type Quiz = {
    id: string;
    name: string;
    subject: string;
};

type QuizzesResponse = {
    quizzes: Quiz[];
};

const ListQuiz = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const { data: session, status } = useSession();
    const router = useRouter()


    useEffect(() => {
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
    }, []);

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
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-4 text-left">Name</th>
                        <th className="px-6 py-4 text-left">Subject</th>
                        <th className="px-6 py-4 text-left">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz) => (
                        <tr key={quiz.id} className="border-b border-gray-200">
                            <td className="px-6 py-4">{quiz.name}</td>
                            <td className="px-6 py-4">{quiz.subject}</td>
                            {session?.user.role === 'student' ? (
                                <td className="px-6 py-4">
                                    <Link href={`/dashboard/quizzes/takequiz/${quiz.id}`}>
                                        <button
                                            className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200"
                                            onClick={() => handleTakeQuiz(quiz.id)}
                                        >
                                            Take Quiz
                                        </button>
                                    </Link>


                                </td>
                            ) : (
                                <td className="px-6 py-4">
                                    <button
                                        className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200"
                                    >
                                        Edit Quiz
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
