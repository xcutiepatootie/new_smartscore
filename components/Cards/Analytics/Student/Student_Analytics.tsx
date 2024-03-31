"use client";

import React, { useEffect, useState } from "react";
import Chart from "@/components/Cards/Analytics/Student/Chart";
import Feedback from "@/components/Cards/Analytics/Student/Feedback";
import Quiz_Results from "@/components/Cards/Analytics/Student/Quiz_Results";
import QuizName_Popover from "@/components/Popovers/Student/QuizName_Popover";
import { getFeedback } from "@/lib/server_actions/actions";
const Student_Analytics = ({
  quizNames,
}: {
  quizNames: { id: string; value: string; label: string }[];
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  // For Feedbacks
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizNames.find(
      (quiz: any) => quiz.value === selectedQuiz,
    );

    if (selectedQuizObject) {
      console.log(selectedQuizObject.id);
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz]);

  useEffect(() => {
    if (selectedQuizId !== "") {
      const getQuizResults = async () => {};
      const getQuizFeedbacks = async () => {
        const fetchFeedback = await getFeedback(selectedQuizId);
        setFeedback(fetchFeedback);
      };
      console.log("testing lang hehe");
      getQuizResults;

      getQuizFeedbacks();
    }
  }, [selectedQuizId]);

  console.log(feedback);
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
        <Feedback feedback={feedback} />
      </div>
    </>
  );
};

export default Student_Analytics;
