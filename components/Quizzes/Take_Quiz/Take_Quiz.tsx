"use client";
import { submitStudentAnswers } from "@/lib/server_actions/actions";
import {
  QuizAnswerFields,
  QuizAnswersSchema,
  QuizFields,
  ScoreResult,
  Student_Quiz_Result,
} from "@/types/types";
import { margarine, poppins } from "@/utils/fonts";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RiHourglassFill } from "react-icons/ri";
import { MdSubject } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const Take_Quiz = ({
  selectedQuiz,
  quizId,
}: {
  selectedQuiz: QuizFields;
  quizId: string;
}) => {
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [answerChanges, setAnswerChanges] = useState(0);
  const [isPageFocused, setIsPageFocused] = useState(true);
  const [focusCount, setFocusCount] = useState(0);

  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading, isDirty },
  } = useForm<QuizAnswerFields>({ resolver: zodResolver(QuizAnswersSchema) });

  const [timerStopped, setTimerStopped] = useState<boolean>(true);
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
    answers: QuizAnswerFields,
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
      'input[type="radio"]:checked',
    );
    const selectedValues = Array.from(selectedInputs).map(
      (input: any) => input.value,
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

    if (submitAnswer === "Success") {
      toast({
        className: "bg-green-600 text-neutral-100",
        title: "SmartScore",
        description: "Successfully Submitted the Quiz.",
      });
      router.push("/dashboard/quizzes");
    } else {
      toast({
        title: "SmartScore",
        description: "Error submitting the quiz please try again.",
        variant: "destructive",
      });
    }

    // Construct the URL with query parameters
    // Navigate to the other page
    //router.push(url);
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="container mx-auto mt-4 h-[85vh] w-screen overflow-y-auto rounded-lg bg-slate-50 p-4 shadow-lg">
          <h3 className="mb-2 flex flex-row items-center justify-center text-xl font-semibold">
            <span>
              <MdQuiz size={25} className="mr-4" />
            </span>
            Quiz Name: {selectedQuiz?.quizName}
          </h3>
          <p className="mb-4 flex flex-row items-center justify-center text-gray-500">
            <span>
              <MdSubject size={20} className="mr-4" />
            </span>
            Subject: {selectedQuiz?.subject}
          </p>
          <Separator className="my-2 h-1 bg-lime-700" />
          {startQuiz ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="border bg-white shadow-2xl">
                  <div className="mt-4 flex flex-row items-center justify-center  ">
                    <div className="flex items-center justify-center rounded-lg border bg-gray-50 px-6">
                      <RiHourglassFill
                        size={40}
                        className="animate-infinite animate-duration-[2500ms] animate-ease-in-out animate-alternate-reverse animate-pulse text-amber-800"
                      />
                      <span
                        className={`${margarine.className}flex m-4 w-48 flex-row rounded-lg  px-4 py-2 text-2xl font-bold`}
                      >
                        {formatTime(time)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-wrap">
                    {selectedQuiz?.questions.map((question, index) => (
                      <li key={`question_${index}`} className="mb-4">
                        <div className="flex">
                          <div className="m-4 rounded-lg border-2 bg-white p-4 shadow-lg">
                            <p className="mb-2 text-lg font-medium">
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
                    className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-8 bg-[#f8f1a6] p-8">
              <Label className={`${poppins.className} text-5xl`}>
                DISCLAIMER
              </Label>
              <div className="flex max-h-[50vh] items-center justify-center rounded-2xl bg-white p-12 shadow-2xl drop-shadow-2xl ">
                <p className="w-full text-wrap text-sm md:text-xl">
                  Before you start the quiz, please note that your clicks will
                  be tracked each time you change your answer. Additionally,
                  opening new tabs while answering will also be monitored. If
                  you don&apos;t achieve a perfect score on your first attempt,
                  you&apos;ll have 5 retries to perfect the quiz. However, if
                  you manage to get a perfect score, the quiz will be considered
                  completed. Make sure you&apos;re ready to take the quiz, as
                  the timer will start automatically once you press the start
                  button. If you submitted the quiz, the system will show a
                  notification that you submitted the quiz.
                  <br />
                  <br />
                  If you have any concerns or questions, please reach out to
                  your teacher. Good luck!
                </p>
              </div>

              <Button
                className="h-16 w-2/3 rounded-full bg-yellow-600 text-3xl hover:bg-lime-500"
                onClick={() => {
                  setStartQuiz(true);
                  setTimerStopped(false);
                }}
              >
                Start Quiz
              </Button>
            </div>
          )}
        </div>
      </div>
      {/*  <DevTool control={control} /> */}
    </div>
  );
};
