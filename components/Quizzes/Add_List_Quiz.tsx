"use client";
import AddQuiz from "@/components/Quizzes/AddQuiz/AddQuiz";
import ListQuiz from "@/components/Quizzes/ListQuiz/ListQuiz";
import { Quiz } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TakeQuiz_UseCode from "./Take_Quiz/TakeQuiz_UseCode";
import { Button } from "../ui/button";
import { IoCreate } from "react-icons/io5";
import { IoList } from "react-icons/io5";

export const Add_List_Quiz = ({ quizList, quizTaken, studentSection }: any) => {
  const [showViewQuiz, setShowViewQuiz] = useState(true);
  const { data: session, status } = useSession();

  const handleToggleView = () => {
    setShowViewQuiz(!showViewQuiz);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-start px-4">
          <Button
            className={`rounded bg-yellow-500 px-4 py-2 font-bold text-black transition-all duration-200 hover:bg-yellow-600 hover:text-white ${
              showViewQuiz ? "bg-opacity-100" : "bg-opacity-50"
            }`}
            onClick={handleToggleView}
            disabled={showViewQuiz}
          >
            <span className="mr-2">
              <IoList size={25} />
            </span>
            View Quiz
          </Button>

          {session?.user.role === "faculty" ? (
            <div className="px-4">
              <Button
                className={`rounded bg-yellow-500 px-4 py-2 font-bold text-black transition-all duration-200 hover:bg-yellow-600 hover:text-white ${
                  !showViewQuiz ? "bg-opacity-100" : "bg-opacity-50"
                }`}
                onClick={handleToggleView}
                disabled={!showViewQuiz}
              >
                <span className="mr-2">
                  <IoCreate size={25} />
                </span>
                Create Quiz
              </Button>
            </div>
          ) : (
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

        <div className="container mx-auto mt-4 h-[80vh] w-screen overflow-y-auto rounded-lg bg-white p-4 shadow-lg">
          {showViewQuiz ? (
            <ListQuiz quizList={quizList} quizTaken={quizTaken} />
          ) : (
            <AddQuiz studentSection={studentSection} />
          )}
        </div>
      </div>
    </div>
  );
};
