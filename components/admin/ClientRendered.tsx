"use client";
import React, { useEffect, useState } from "react";
import QuizName_Popover from "../Popovers/Student/QuizName_Popover";
import Feedback_Input from "../Cards/Analytics/Faculty/Feedback/Contents/Feedback_Input";
import Charts from "../Cards/Analytics/Faculty/Charts";
import Feedback_Admin from "./Feedback_Admin";
import { getFeedback_Admin } from "@/lib/server_actions/actions";
import { useToast } from "../ui/use-toast";
import ClusterValues from "../Cards/Analytics/Faculty/ClusterValues";

const fetchFeedbackData = async (selectedQuizId: string) => {
  try {
    const fetchData = await getFeedback_Admin(selectedQuizId);
    if (fetchData) {
      return fetchData;
    }
  } catch (error) {}
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

const ClientRendered = ({
  quizzes,
}: {
  quizzes: { id: string; value: string; label: string }[];
}) => {
  const { toast } = useToast();

  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");

  const [feedback, setFeedback] = useState<any>();

  const [clusterAssignment, setClusterAssignment] = useState<any>();

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizzes.find(
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

      getQuizFeedbacks();
    }
  }, [selectedQuizId]);

  return (
    <div>
      <QuizName_Popover
        popoverValues={quizzes}
        setSelectedQuiz={setSelectedQuiz}
      />

      <Charts quizzes={quizzes} quizId={selectedQuizId} />
      <ClusterValues quizId={selectedQuizId} />
      <Feedback_Admin feedback={feedback} />
    </div>
  );
};

export default ClientRendered;
