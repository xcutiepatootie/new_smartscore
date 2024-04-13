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

export const Add_List_Quiz = ({ quizList, quizTaken }: any) => {
  const [showViewQuiz, setShowViewQuiz] = useState(true);
  const { data: session, status } = useSession();

  const handleToggleView = () => {
    setShowViewQuiz(!showViewQuiz);
  };

  return (
    <div className="grid-rows-auto grid items-center justify-center lg:p-6">
      <div className="flex flex-col items-center justify-start p-4 lg:flex-row">
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
          <Button
            className={`mt-4 rounded bg-yellow-500 px-4 py-2 font-bold text-black transition-all duration-200 hover:bg-yellow-600 hover:text-white lg:ml-4 lg:mt-0 ${
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
        ) : (
          <div className="mt-4 lg:ml-4 lg:mt-0">
            <TakeQuiz_UseCode />
          </div>
        )}
      </div>

      <div className="container mt-4 w-full overflow-y-auto rounded-lg bg-white p-8 shadow-lg max-lg:flex lg:mt-0">
        {showViewQuiz ? (
          <ListQuiz quizList={quizList} quizTaken={quizTaken} />
        ) : (
          <AddQuiz />
        )}
      </div>
    </div>
  );
};
