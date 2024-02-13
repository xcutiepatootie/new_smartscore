"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Quiz = {
    id: string;
    quizName: string;
    subject: string;
    questions: {
        id: string;
        questionIndex: string;
        questionText: string;
        options: string[];
        correctAnswers: string[];
    }[];
};

export default function Page({ params }: { params: { quizId: string } }) {

    const { data: session, status } = useSession();

    const [answerChanges, setAnswerChanges] = useState(0);

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [timerStopped, setTimerStopped] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);
    const router = useRouter()
    const quizId = params.quizId;


    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.post('/api/fetchquiz', { quizId });
                setQuiz(response.data.quiz);
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            }
        };
       
        fetchQuiz();
    }, []);
    console.log(quiz)
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!timerStopped) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [timerStopped]);

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    };

    const padZero = (value: number): string => {
        return String(value).padStart(2, '0');
    };

    const handleTimerStop = () => {
        setTimerStopped(true);
    };

    const handleAnswerChange = () => {
        setAnswerChanges(answerChanges + 1);
        console.log(answerChanges)
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        handleTimerStop()
        const selectedInputs = document.querySelectorAll('input[type="radio"]:checked');
        const selectedValues = Array.from(selectedInputs).map((input: any) => input.value);

        console.log('Selected Inputs:', selectedValues);
        console.log('Final Time:', time);




        // Construct the URL with query parameters
        const url = `/dashboard/quizzes/takequiz/${quizId}/results`;

        // Navigate to the other page
        //router.push(url);

        try {
            const response = await axios.post('/api/saveStudentQuiz/', {
                quizId: quizId,
                studentAnswers: selectedValues,
                time: time,
                studentId: session?.user.id,
                studentName: session?.user.name,
                answerChanges: answerChanges,
            })
        } catch (error) {

        }


    }

    if (!quiz) {
        return <div>Loading...</div>;

    }
    return (
        <div className="flex">
            <div className="">
                <div className="container w-screen h-[85vh] mx-auto mt-4 bg-lsblue p-4 rounded-lg shadow-lg overflow-y-auto">
                    {!timerStopped && (
                        <div>

                            {/* <button onClick={handleTimerStop}>Stop Timer</button> */}
                        </div>
                    )}
                    <span>{formatTime(time)}</span>
                    <h3 className="text-xl font-semibold mb-2">Quiz Name: {quiz?.quizName}</h3>
                    <p className="text-gray-500 mb-4">Subject: {quiz?.subject}</p>
                    <form>
                        <ul>
                            {quiz?.questions.map((question) => (
                                <li key={question.id} className="mb-4">
                                    <p className="text-lg font-medium mb-2">
                                        Question {question.questionIndex}: {question.questionText}
                                    </p>
                                    <ul className="pl-4 space-y-2">
                                        {question.options.map((option) => (
                                            <label key={option} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`question_${question.id}`}
                                                    value={option}
                                                    className="mr-2"
                                                    onChange={handleAnswerChange}
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        <div className="py-4">
                            <button
                                className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit

                            </button>



                        </div>
                    </form>


                </div>
            </div >
        </div >


    )
}
