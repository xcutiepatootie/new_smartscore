"use client";
import React, { useCallback, useEffect, useState } from "react";
import Quiz_section_Popover from "../../Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import { getClusterChart } from "@/lib/server_actions/actions";
import { Card, CardContent } from "@/components/ui/card";
import DistancePicker from "./DropdownMenu/DistancePicker";
import ValuesPicker from "./DropdownMenu/ValuesPicker";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const apiurl = process.env.API_URL as string;
console.log(apiurl);

const clusterChart = async (quizId: string, xvalue: string, yvalue: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/charts/plot64?quizId=${quizId}&xvalue=${xvalue}&yvalue=${yvalue}`,

      {
        method: "GET",
      },
    );

    if (response.ok) {
      console.log(response);
      return response.text();
    }
  } catch (error) {
    console.log(error);
  }
};

const Charts = ({ quizzes, quizId }: any) => {
  console.log(quizzes);

  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState("");
  const [xvalue, setXValue] = useState<string>("score");
  const [yvalue, setYValue] = useState<string>("time");
  const [selectedDistanceMethod, setSelectedDistanceMethod] =
    useState<string>("");

  // Memoize event handler functions using useCallback
  const handleSetXValue = useCallback((value: string) => {
    setXValue(value);
  }, []);

  const handleSetYValue = useCallback((value: string) => {
    setYValue(value);
  }, []);

  console.log("X:", xvalue);
  console.log("Y:", yvalue);
  /*  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizzes.find(
      (quiz: any) => quiz.quizName.toLowerCase() === selectedQuiz
    );

    if (selectedQuizObject) {
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz]); */

  useEffect(() => {
    setLoading(true);
    if (quizId) {
      const fetchChart = async () => {
        const getChart = await clusterChart(quizId, xvalue, yvalue);
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
  }, [quizId, xvalue, yvalue]);

  console.log(selectedQuiz, selectedQuizId);
  console.log(xvalue);
  console.log(yvalue);
  console.log(selectedDistanceMethod);
  return (
    <div>
      <Card className="w-auto p-2">
        <CardContent>
          {data && (
            <>
              <div className="flex flex-row space-x-4">
                {/* <DistancePicker
                  setSelectedDistanceMethod={setSelectedDistanceMethod}
                /> */}
                <div>
                  <Label>X Value: </Label>
                  <ValuesPicker
                    defaultValue={"score"}
                    setSelectedValue={handleSetXValue}
                  />
                </div>
                <div>
                  <Label>Y Value: </Label>
                  <ValuesPicker
                    defaultValue={"time"}
                    setSelectedValue={handleSetYValue}
                  />
                </div>
              </div>

              <Image
                width={850}
                height={250}
                src={`data:image/png;base64,${data}`}
                alt="Base64 Image"
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* <div>{imageSrc && <img src={imageSrc} alt="API Image" />}</div> */}
    </div>
  );
};

export default Charts;
