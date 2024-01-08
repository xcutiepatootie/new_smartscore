"use client"
import axios from 'axios';

import React, { useState, useEffect } from 'react';

type Quiz = {
    id: string;
    name: string;
    subject: string;
    questions: {
        id: string;
        questionIndex: string;
        questionText: string;
        options: string[];
        correctAnswers: string[];
    }[];
};


type QuizzesResponse = {
    quizzes: Quiz[];
};

export default function Page() {


    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [timeTaken, setTimeTaken] = useState<string | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await axios.post('/api/fetchquiz')

            setQuizzes(response.data.quizzes);
        };

        fetchQuizzes();
    }, []);

    const handleQuizStart = () => {
        const start = new Date();
        setStartTime(start);
    };

    const handleQuizSubmit = () => {
        const end = new Date();
        setEndTime(end);

        const timeDifference = (end.getTime() - startTime!.getTime()) / 1000;
        const hours = Math.floor(timeDifference / 3600);
        const minutes = Math.floor((timeDifference % 3600) / 60);

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setTimeTaken(formattedTime);
    };

    return (
        <div className="flex">
            <div className="ml-60 p-4">
                <div className="container w-screen h-[85vh] mx-auto mt-4 bg-lsblue p-4 rounded-lg shadow-lg overflow-y-auto">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">Quiz Name: {quiz.name}</h3>
                            <p className="text-gray-500 mb-4">Subject: {quiz.subject}</p>
                            <ul>
                                {quiz.questions.map((question) => (
                                    <li key={question.id} className="mb-4">
                                        <p className="text-lg font-medium mb-2">
                                            Question {question.questionIndex}: {question.questionText}
                                        </p>
                                        <ul className="pl-4 space-y-2">
                                            {question.options.map((option) => (
                                                <label key={option} className="flex items-center">
                                                    <input type="radio" name={`question_${question.id}`} value={option} className="mr-2" />
                                                    <span>{option}</span>
                                                </label>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
