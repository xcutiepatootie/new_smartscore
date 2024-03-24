"use client";
import React, { useCallback, useEffect, useState } from "react";
import Quiz_section_Popover from "../../Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import { getClusterChart } from "@/lib/server_actions/actions";
import { Card, CardContent } from "@/components/ui/card";
import DistancePicker from "./DropdownMenu/DistancePicker";
import ValuesPicker from "./DropdownMenu/ValuesPicker";
import { Label } from "@/components/ui/label";

const Charts = ({ quizzes }: any) => {
  console.log(quizzes);

  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState("");
  const [xvalue, setXValue] = useState<string>("");
  const [yvalue, setYValue] = useState<string>("");
  const [selectedDistanceMethod, setSelectedDistanceMethod] =
    useState<string>("");

  // Memoize event handler functions using useCallback
  const handleSetXValue = useCallback((value: string) => {
    setXValue(value);
  }, []);

  const handleSetYValue = useCallback((value: string) => {
    setYValue(value);
  }, []);

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
          //   console.log("Image to ha", fetchedData);
          setData(fetchedData);
          setLoading(false);
        });
      }, 1000);
    }
  }, [selectedQuizId]);

  console.log(selectedQuiz, selectedQuizId);
  console.log(xvalue);
  console.log(yvalue);
  console.log(selectedDistanceMethod);
  return (
    <div>
      <Quiz_section_Popover
        quizzes={quizzes}
        setSelectedQuiz={setSelectedQuiz}
      />
      <div className="grid grid-cols-2">
        <Card className="w-auto p-2">
          <CardContent>
            {data && (
              <>
                <div className="flex flex-row space-x-4">
                  <DistancePicker
                    setSelectedDistanceMethod={setSelectedDistanceMethod}
                  />
                  <div>
                    <Label>X Value: </Label>
                    <ValuesPicker setSelectedValue={handleSetXValue} />
                  </div>
                  <div>
                    <Label>Y Value: </Label>
                    <ValuesPicker setSelectedValue={handleSetYValue} />
                  </div>
                </div>

                <img src={`data:image/png;base64,${data}`} alt="Base64 Image" />
              </>
            )}
          </CardContent>
        </Card>
        <div></div>
      </div>

      {/* <div>{imageSrc && <img src={imageSrc} alt="API Image" />}</div> */}
    </div>
  );
};

export default Charts;
