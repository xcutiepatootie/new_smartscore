import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface QuizData {
    quizName: string;
    numberOfItems: string;
    subject: string; // New field for subject
    questions: { questionText: string; options: string[]; answers: string[] }[];
    answers: string[];
    options: string[][];
    questionIndex: number;
    facultyId?: string
}

const AddQuiz = () => {

    const { data: session, status } = useSession()




    const [quizData, setQuizData] = useState<QuizData>({
        quizName: '',
        numberOfItems: '',
        subject: '', // New field for subject
        questions: [],
        answers: [],
        options: [],
        questionIndex: 1,
        facultyId: session?.user.id
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuizData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleQuestionChange = (index: number, value: string) => {
        setQuizData((prevState) => {
            const updatedQuestions: any = [...prevState.questions];
            updatedQuestions[index] = { questionText: value, options: [], answers: [] };
            return {
                ...prevState,
                questions: updatedQuestions,
                questionIndex: index + 1,
            };
        });
    };

    const handleAnswerChange = (index: number, value: string) => {
        setQuizData((prevState) => {
            const updatedAnswers: any = [...prevState.answers];
            updatedAnswers[index] = value;
            return {
                ...prevState,
                answers: updatedAnswers,
            };
        });
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        setQuizData((prevState) => {
            const updatedOptions: any = [...prevState.options];
            if (!updatedOptions[questionIndex]) {
                updatedOptions[questionIndex] = ['', '', '', ''];
            }
            updatedOptions[questionIndex][optionIndex] = value;
            return {
                ...prevState,
                options: updatedOptions,
            };
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here

        // Map the questions, answers, and options arrays to the desired structure
        const mappedQuestions = quizData.questions.map((question, index) => ({
            text: question.questionText,
            options: quizData.options[index] || [],
            answers: quizData.answers[index] || [],
        }));

        const reqBody = {
            quizName: quizData.quizName,
            numberOfItems: quizData.numberOfItems,
            subject: quizData.subject, // Include subject in the request body
            questions: mappedQuestions,
            facultyId: quizData.facultyId
        };

        console.log('Form submitted:', reqBody);

        try {
            const response = await axios.post('/api/createQuiz', { quizData: reqBody });
            if (response.status === 200) {
                console.log('Quiz data saved successfully');
            } else {
                console.error('Failed to save quiz data');
            }
        } catch (error) {
            console.error('Error saving quiz data:', error);
        }
    };

    return (
        <div>
            <h1 className="pb-4">Create Quiz</h1>
            <div className="border-t-2">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap py-4 border-b-2">
                        <div>
                            <label className="px-2" htmlFor="quizName">
                                Quiz Name:
                            </label>
                            <input
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                type="text"
                                id="quizName"
                                name="quizName"
                                value={quizData.quizName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="px-2" htmlFor="numberOfItems">
                                Number of Items:
                            </label>
                            <input
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                min={1}
                                type="number"
                                id="numberOfItems"
                                name="numberOfItems"
                                value={quizData.numberOfItems}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div> {/* New div for subject */}
                            <label className="px-2" htmlFor="subject">
                                Subject:
                            </label>
                            <input
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                type="text"
                                id="subject"
                                name="subject"
                                value={quizData.subject}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {Array.from({ length: Number(quizData.numberOfItems) }, (_, index) => (
                        <div className="m-2" key={index}>
                            <div className="pb-2">
                                <label className="px-2" htmlFor={`quizName${index + 1}`}>
                                    Question {index + 1}:
                                </label>
                                <input
                                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-3/4"
                                    type="text"
                                    id={`quizName${index + 1}`}
                                    name={`quizName${index + 1}`}
                                    value={quizData.questions[index]?.questionText || ''}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    required
                                />
                            </div>

                            <div className="pb-2">
                                <label className="px-2" htmlFor={`answer${index + 1}`}>
                                    Correct Answer:
                                </label>
                                <input
                                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    type="text"
                                    id={`answer${index + 1}`}
                                    name={`answer${index + 1}`}
                                    value={quizData.answers[index] || ''}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex gap-4 pb-6 border-b-2">
                                <label className="px-2">Answers:</label>
                                <div>
                                    <label htmlFor={`answer${index + 1}-1`}>a.</label>
                                    <input
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"
                                        id={`answer${index + 1}-1`}
                                        name={`answer${index + 1}-1`}
                                        value={quizData.options[index]?.[0] || ''}
                                        onChange={(e) => handleOptionChange(index, 0, e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`answer${index + 1}-2`}>b.</label>
                                    <input
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"
                                        id={`answer${index + 1}-2`}
                                        name={`answer${index + 1}-2`}
                                        value={quizData.options[index]?.[1] || ''}
                                        onChange={(e) => handleOptionChange(index, 1, e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`answer${index + 1}-3`}>c.</label>
                                    <input
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"
                                        id={`answer${index + 1}-3`}
                                        name={`answer${index + 1}-3`}
                                        value={quizData.options[index]?.[2] || ''}
                                        onChange={(e) => handleOptionChange(index, 2, e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`answer${index + 1}-4`}>d.</label>
                                    <input
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"
                                        id={`answer${index + 1}-4`}
                                        name={`answer${index + 1}-4`}
                                        value={quizData.options[index]?.[3] || ''}
                                        onChange={(e) => handleOptionChange(index, 3, e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="py-4">
                        <button
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;
