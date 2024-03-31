"use client";

import React, { useEffect, useState } from "react";
import Chart from "@/components/Cards/Analytics/Student/Chart";
import Feedback from "@/components/Cards/Analytics/Student/Feedback";
import Quiz_Results from "@/components/Cards/Analytics/Student/Quiz_Results";
import QuizName_Popover from "@/components/Popovers/Student/QuizName_Popover";
const Student_Analytics = ({
  quizNames,
}: {
  quizNames: { value: string; label: string }[];
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");

  useEffect(() => {
    const getQuizResults = async () => {};
    console.log("testing lang hehe");
    getQuizResults;
  }, [selectedQuiz]);

  return (
    <>
      <div className="row-span-2 h-[95%] space-y-2 px-4 py-2">
        <QuizName_Popover
          popoverValues={quizNames}
          setSelectedQuiz={setSelectedQuiz}
        />
        <Chart quizTitle={selectedQuiz} />
      </div>
      <div className="h-full p-4">
        <Quiz_Results />
      </div>
      <div className="h-full p-4">
        <Feedback />
      </div>
    </>
  );
};

export default Student_Analytics;
