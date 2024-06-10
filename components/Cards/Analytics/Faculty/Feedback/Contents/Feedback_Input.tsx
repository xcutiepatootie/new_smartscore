"use client";

import Quiz_section_Popover from "@/components/Cards/Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import { Label } from "@/components/ui/label";
import {
  getClusterValues,
  getPrevFeedback,
} from "@/lib/server_actions/actions";
import { clusterType, feedbackSchemaType } from "@/types/types";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ClusterValues from "../../ClusterValues";
import { Input } from "@/components/ui/input";
import Input_Form from "./Input_Form";
import { Prisma } from "@prisma/client";
import Charts from "../../Charts";

export type FeedbackItem = {
  feedback: string;
};

const clusterValues = async (quizId: string) => {
  console.log("Test", process.env.API_URL);
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/cluster/average-values-hc?quizId=${quizId}`,

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

const studentClusterAssignments = async (quizId: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/assignments_hc?quizId=${quizId}`,

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

const Feedback_Input = ({ quizzes }: any) => {
  const [prevFeedback, setPrevFeedback] = useState<string[]>([]);
  const [jprevFeedback, setJPrevFeedback] = useState<any>();

  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [clusterData, setClusterData] = useState<clusterType>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [clusterAssignments, setClusterAssignments] = useState<any>();

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizzes.find(
      (quiz: any) => quiz.quizName.toLowerCase() === selectedQuiz,
    );

    if (selectedQuizObject) {
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz]);

  useEffect(() => {
    if (selectedQuiz !== "") {
      const selectedQuizObject = async () => {
        console.log("quizid", selectedQuizId);
        const fetchData = await getPrevFeedback(selectedQuizId);
        setJPrevFeedback(fetchData);
        if (fetchData) {
          const { PostedFeedbacks } = fetchData;
          setPrevFeedback(PostedFeedbacks);
        }
      };

      selectedQuizObject();
    }
  }, [selectedQuizId]);

  useEffect(() => {
    if (selectedQuiz !== "") {
      const fetchClusterValues = async () => {
        console.log("quizid", selectedQuizId);
        const fetchData = await clusterValues(selectedQuizId);
        console.log("Fetched Clustered Data", fetchData);
        setClusterData(fetchData);
      };

      const fetchClusterAssignment = async () => {
        const fetchData = await studentClusterAssignments(selectedQuizId);
        setClusterAssignments(fetchData);
      };

      //method
      fetchClusterValues();
      fetchClusterAssignment();
    }
  }, [selectedQuizId]);
  console.log(clusterData);
  console.log(prevFeedback);
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex-row space-x-4">
          <Quiz_section_Popover
            quizzes={quizzes}
            setSelectedQuiz={setSelectedQuiz}
          />
        </div>

        {clusterData && selectedQuiz ? (
          <div className="h-full space-y-2">
            <div className="flex flex-col lg:flex-row justify-around gap-4 p-2">
              <ClusterValues quizId={selectedQuizId} />
            </div>

            <div className="flex w-full flex-row items-center justify-center">
              <Charts quizId={selectedQuizId} />
            </div>

            <div className="rounded-md border p-4 shadow-lg">
              <Label className="text-2xl underline">
                {" "}
                Provide Feedback here.
              </Label>
              <Input_Form
                prevfeedbacks={prevFeedback}
                quizId={selectedQuizId}
                quizName={selectedQuiz}
                clusterData={clusterData}
                clusterAssignments={clusterAssignments}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Label className="mt-12 text-center text-3xl">
              Please Select A Quiz
            </Label>
          </div>
        )}
      </div>
    </>
  );
};

export default Feedback_Input;
