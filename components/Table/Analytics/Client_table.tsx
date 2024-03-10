"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { QuizData_Cards } from "@/types/types";
import Quiz_section_Popover from "@/components/Cards/Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import prisma from "@/lib/prisma";
import { getQuizTaken } from "@/lib/server_actions/actions";

function Client_table({ data, quizzes }: any) {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>(""); // State to store the selected quiz id

  console.log(selectedQuiz, selectedQuizId);

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizzes.find(
      (quiz: any) => quiz.quizName === selectedQuiz
    );
    if (selectedQuizObject) {
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz, quizzes]);

  return (
    <>
      <div>Client_table</div>
      <Quiz_section_Popover
        quizzes={quizzes}
        setSelectedQuiz={setSelectedQuiz}
      />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

export default Client_table;
