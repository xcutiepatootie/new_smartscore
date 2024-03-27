"use client";
import { submitStudentAnswers } from "@/lib/server_actions/actions";
import {
  QuizAnswerFields,
  QuizAnswersSchema,
  QuizFields,
  ScoreResult,
  Student_Quiz_Result,
} from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const Take_Quiz = ({
  selectedQuiz,
  quizId,
}: {
  selectedQuiz: QuizFields;
  quizId: string;
}) => {
  const [answerChanges, setAnswerChanges] = useState(0);
  const [isPageFocused, setIsPageFocused] = useState(true);
  const [focusCount, setFocusCount] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading, isDirty },
  } = useForm<QuizAnswerFields>({ resolver: zodResolver(QuizAnswersSchema) });

  const [timerStopped, setTimerStopped] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const router = useRouter();

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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Needed for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleWindowBlur = () => {
      setFocusCount((prevCount) => prevCount + 1);

      setIsPageFocused(false);
    };

    const handleWindowFocus = () => {
      console.log("HAHA KOW BILANG KO AY", focusCount);
      setIsPageFocused(true);
    };

    // Add event listeners for window blur and focus events
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // Remove event listeners when component unmounts
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (value: number): string => {
    return String(value).padStart(2, "0");
  };

  const handleTimerStop = () => {
    setTimerStopped(true);
  };

  const handleAnswerChange = () => {
    setAnswerChanges(answerChanges + 1);
    console.log(answerChanges);
  };

  function calculateScore(
    quiz: QuizFields,
    answers: QuizAnswerFields
  ): ScoreResult {
    let score = 0;
    let perfect = false;

    for (let i = 0; i < quiz.numberOfItems; i++) {
      const studentAnswer = answers.studentAnswers[i].answer;
      const correctAnswer = quiz.questions[i].correctAnswer;

      if (studentAnswer === correctAnswer) {
        score++;
      }

      if (score === quiz.numberOfItems) {
        perfect = true;
      }
    }

    score = (score / quiz.numberOfItems) * 100;
    score = Math.round(score * 100) / 100;

    return { score, perfect };
  }

  const onSubmit: SubmitHandler<QuizAnswerFields> = async (data) => {
    console.log(data);
    handleTimerStop();
    const selectedInputs = document.querySelectorAll(
      'input[type="radio"]:checked'
    );
    const selectedValues = Array.from(selectedInputs).map(
      (input: any) => input.value
    );

    const studentScore = calculateScore(selectedQuiz, data);

    /* console.log("Selected Inputs:", selectedValues);
    console.log("Final Time:", time);
    console.log("Out Of Focus:", focusCount);
    console.log("answer change count:", answerChanges);
    console.log("score:", studentScore); */

    const formattedValues: Student_Quiz_Result = {
      studentScore: studentScore.score,
      isPerfect: studentScore.perfect,
      focusCount: focusCount,
      numberOfAnswerClicks: answerChanges,
      finalTime: time,
      finalTime_str: formatTime(time),
    };
    console.log(formattedValues);
    const submitAnswer = await submitStudentAnswers(quizId, formattedValues);

    // Construct the URL with query parameters
    // Navigate to the other page
    //router.push(url);
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="container w-screen h-[85vh] mx-auto mt-4 bg-slate-50 p-4 rounded-lg shadow-lg overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2">
            Quiz Name: {selectedQuiz?.quizName}
          </h3>
          <p className="text-gray-500 mb-4">Subject: {selectedQuiz?.subject}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="border bg-white shadow-2xl">
              <div className="mt-4">
                <span className="m-4 ">{formatTime(time)}</span>
              </div>
              <div className="flex flex-col flex-wrap">
                {selectedQuiz?.questions.map((question, index) => (
                  <li key={`question_${index}`} className="mb-4">
                    <div className="flex">
                      <div className="border-2 rounded-lg m-4 p-4 bg-white shadow-lg">
                        <p className="text-lg font-medium mb-2">
                          {index + 1}: {question.questionText}
                        </p>
                        {question.options.map((option, optionIndex) => (
                          <div key={`option_${optionIndex}`}>
                            <Controller
                              key={`option_${optionIndex}`}
                              name={`studentAnswers.${index}.answer`}
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <label
                                  key={`label_${optionIndex}`}
                                  className="block"
                                >
                                  <input
                                    id={`option_${index}_${optionIndex}`}
                                    className="mr-2"
                                    type="radio"
                                    {...field}
                                    value={option}
                                    checked={field.value === option}
                                    onChange={() => {
                                      field.onChange(option);
                                      handleAnswerChange();
                                    }}
                                  />
                                  {option}
                                </label>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </ul>
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
      {/*  <DevTool control={control} /> */}
    </div>
  );
};
