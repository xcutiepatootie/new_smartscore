"use client";
import AddQuiz from "@/components/Quizzes/AddQuiz/AddQuiz";
import ListQuiz from "@/components/Quizzes/ListQuiz/ListQuiz";
import { Quiz } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TakeQuiz_UseCode from "./Take_Quiz/TakeQuiz_UseCode";
import { Button } from "../ui/button";

export const Add_List_Quiz = ({
  quizList,
  quizTaken,
  quizCount_Taken,
}: any) => {
  const [showViewQuiz, setShowViewQuiz] = useState(true);
  const { data: session, status } = useSession();

  const handleToggleView = () => {
    setShowViewQuiz(!showViewQuiz);
  };

  return (
    <div className="flex">
      <div className="">
        <div className="flex flex-row">
          <div>
            <div className="flex flex-row">
              <div className="px-4">
                <Button
                  className={`bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ${
                    showViewQuiz ? "bg-opacity-100" : "bg-opacity-50"
                  }`}
                  onClick={handleToggleView}
                  disabled={showViewQuiz}
                >
                  View Quiz
                </Button>
              </div>

              {session?.user.role === "faculty" && (
                <div className="px-4">
                  <Button
                    className={`bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ${
                      !showViewQuiz ? "bg-opacity-100" : "bg-opacity-50"
                    }`}
                    onClick={handleToggleView}
                    disabled={!showViewQuiz}
                  >
                    Create Quiz
                  </Button>
                </div>
              )}

              {session?.user.role === "student" && (
                <div className="px-4">
                  {/*  <button
                    className={`bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 `}
                  >
                    Take Quiz Using Code
                  </button> */}
                  <TakeQuiz_UseCode />
                </div>
              )}
            </div>

            <div className="container w-screen h-[80vh] mx-auto mt-4 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
              {showViewQuiz ? (
                <ListQuiz
                  quizList={quizList}
                  quizTaken={quizTaken}
                  quizCount_Taken={quizCount_Taken}
                />
              ) : (
                <AddQuiz />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
