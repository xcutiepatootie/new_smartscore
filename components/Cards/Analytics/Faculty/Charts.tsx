"use client";
import React, { useEffect, useState } from "react";
import Quiz_section_Popover from "../../Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import { getClusterChart } from "@/lib/server_actions/actions";

const Charts = ({ quizzes }: any) => {
  console.log(quizzes);

  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>(""); // State to store the selected quiz id
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState("");

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
    setLoading(true);
    if (selectedQuizId) {
      const fetchChart = async () => {
        const getChart = await getClusterChart(selectedQuizId);
        return getChart;
      };

      setTimeout(() => {
        fetchChart().then((fetchedData: any) => {
          console.log("Image to ha", fetchedData);
          setData(fetchedData);
          setLoading(false);
        });
      }, 1000);
    }
  }, [selectedQuizId]);

  console.log(selectedQuiz, selectedQuizId);
  return (
    <div>
      <Quiz_section_Popover
        quizzes={quizzes}
        setSelectedQuiz={setSelectedQuiz}
      />
      {data && <img src={`data:image/png;base64,${data}`} alt="Base64 Image" />}

      {/* <div>{imageSrc && <img src={imageSrc} alt="API Image" />}</div> */}
    </div>
  );
};

export default Charts;
