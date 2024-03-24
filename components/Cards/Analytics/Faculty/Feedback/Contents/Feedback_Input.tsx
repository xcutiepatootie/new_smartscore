"use client";

import Quiz_section_Popover from "@/components/Cards/Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import { Label } from "@/components/ui/label";
import { getClusterValues } from "@/lib/server_actions/actions";
import { clusterType } from "@/types/types";
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

const Feedback_Input = ({ quizzes }: any) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [clusterData, setClusterData] = useState<clusterType>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // State to store the selected quiz id

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizzes.find(
      (quiz: any) => quiz.quizName.toLowerCase() === selectedQuiz
    );

    if (selectedQuizObject) {
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz]);

  useEffect(() => {
    if (selectedQuiz !== "") {
      const fetchClusterValues = async () => {
        console.log("quizid", selectedQuizId);
        const fetchData = await getClusterValues(selectedQuizId);
        console.log("Fetched Clustered Data", fetchData);
        setClusterData(fetchData);
      };

      //method
      fetchClusterValues();
    }
  }, [selectedQuizId]);
  console.log(clusterData);
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-row space-x-4">
          <Quiz_section_Popover
            quizzes={quizzes}
            setSelectedQuiz={setSelectedQuiz}
          />
          {selectedQuiz && (
            <Dialog>
              <DialogTrigger className="bg-white rounded-lg outline-none p-2 text-sm outline-slate-100">
                Show Cluster Values
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cluster Values</DialogTitle>
                  <div className="flex flex-row">
                    <ClusterValues quizId={selectedQuizId} />
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {clusterData && (
          <>
            {clusterData.map((cluster) => (
              <div key={cluster.clusterNumber}>
                <Label>Cluster {cluster.clusterNumber}</Label>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Feedback_Input;
