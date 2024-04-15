"use client";

import React, { useEffect, useState } from "react";
import Chart from "@/components/Cards/Analytics/Student/Chart";
import Feedback from "@/components/Cards/Analytics/Student/Feedback";
import Quiz_Results from "@/components/Cards/Analytics/Student/Quiz_Results";
import QuizName_Popover from "@/components/Popovers/Student/QuizName_Popover";
import {
  getChartValues,
  getFeedback,
  getQuizResultByUser,
  getStudentClusterAssignments,
  getUserSession,
} from "@/lib/server_actions/actions";
import { useToast } from "@/components/ui/use-toast";

const quizResultByUser = async (selectedQuizId: string) => {
  try {
    const fetchResults = await getQuizResultByUser(selectedQuizId);
    return fetchResults;
  } catch (error) {
    console.log(error);
  }
};

const studentClusterAssignments = async (quizId: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/assignments?quizId=${quizId}`,

      {
        method: "GET",
      },
    );

    if (response.ok) {
      console.log(response);
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchFeedbackData = async (selectedQuizId: string) => {
  try {
    const fetchData = await getFeedback(selectedQuizId);
    if (fetchData) {
      return fetchData;
    }
  } catch (error) {}
};

const chartValues = async (quizId: string) => {
  try {
    const userSession = await getUserSession();
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/student_records_charts?quizId=${quizId}&studentId=${userSession?.user.id}`,
      { method: "GET" },
    );
    if (response) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const Student_Analytics = ({
  quizNames,
}: {
  quizNames: { id: string; value: string; label: string }[];
}) => {
  const { toast } = useToast();
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  // For Feedbacks
  const [feedback, setFeedback] = useState();

  // For Charts
  const [clusterAssignment, setClusterAssignment] = useState<any>();
  const [barValues, setBarValues] = useState<any>();

  // For Results
  const [result, setResult] = useState<any>();

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
      const getQuizResult = async () => {
        const fetchResults = await quizResultByUser(selectedQuizId);
        console.log("Results ", fetchResults);
        setResult(fetchResults);
      };

      const getQuizFeedbacks = async () => {
        const fetchFeedback = await fetchFeedbackData(selectedQuizId);
        setFeedback(fetchFeedback);

        const fetchAssignments =
          await studentClusterAssignments(selectedQuizId);
        if (fetchAssignments === "Not Enough Instances to cluster") {
          toast({
            title: "Not enough instances to show the cluster",
            description:
              "Please try again later after many has answered the quiz.",
            variant: "destructive",
          });
        } else {
          setClusterAssignment(fetchAssignments);
        }
      };

      const getChartValue = async () => {
        const fetchChartValue = await chartValues(selectedQuizId);
        console.log(fetchChartValue);
        if (fetchChartValue === "No Quiz Found") {
          toast({
            title: "No Record Found",
            description: "Please Answer the Quiz First",
            variant: "destructive",
          });
        } else {
          setBarValues(fetchChartValue);
        }
      };
      console.log("testing lang hehe");
      getQuizResult();

      getQuizFeedbacks();
      getChartValue();
    }
  }, [selectedQuizId]);

  console.log(feedback);
  return (
    <>
      <div className="row-span-2 h-[95%]  px-4 ">
        <QuizName_Popover
          popoverValues={quizNames}
          setSelectedQuiz={setSelectedQuiz}
        />

        <Chart
          quizTitle={selectedQuiz}
          clusterAssignments={clusterAssignment}
          barValues={barValues}
        />
      </div>
      <div className="h-full p-2">
        <Quiz_Results results={result} />
      </div>
      <div className="h-full p-2">
        <Feedback feedback={feedback} selectedQuizId={selectedQuizId} />
      </div>
    </>
  );
};

export default Student_Analytics;
