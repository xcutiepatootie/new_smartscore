import React from "react";
import Chart from "@/components/Cards/Analytics/Student/Chart";
import Feedback from "@/components/Cards/Analytics/Student/Feedback";
import Quiz_Results from "@/components/Cards/Analytics/Student/Quiz_Results";
import QuizName_Popover from "@/components/Popovers/Student/QuizName_Popover";
const Student_Analytics = ({
  quizNames,
}: {
  quizNames: { value: string; label: string }[];
}) => {
  return (
    <>
      <div className="row-span-2 h-full space-y-4 p-4">
        <QuizName_Popover popoverValues={quizNames} />
        <Chart />
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
