"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizData_Cards } from "@/types/types";
import React, { useState } from "react";
import Quiz_section_Popover from "./Quiz_section_Popover/Quiz_section_Popover";
import List_Students from "./List_Students/List_Students";

const Quiz_Section = ({ quizzes }: { quizzes: QuizData_Cards[] }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>(""); // Set default selected quiz

  console.log("Card", quizzes);
  console.log("Selected: ", selectedQuiz);

  // Function to find the quiz object based on the selectedQuiz name
  const findSelectedQuiz = (quizName: string) => {
    return quizzes.find((quiz) => quiz.quizName.toLowerCase() === quizName);
  };

  // When the selectedQuiz changes, find its corresponding quiz object
  const selectedQuizObject = selectedQuiz
    ? findSelectedQuiz(selectedQuiz)
    : null;

  console.log("Selected quiz:", selectedQuizObject);
  return (
    <>
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Total Number of Quiz</CardTitle>
          <CardDescription>
            shows the number of available quiz for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Quiz_section_Popover
            quizzes={quizzes}
            setSelectedQuiz={setSelectedQuiz}
          />
          {/* Render Here The Quiz And Section */}
          <Tabs className="w-auto py-2">
            <TabsList className="grid w-full grid-cols-2">
              {selectedQuizObject &&
                selectedQuizObject.sectionAssigned.map((section, index) => (
                  <TabsTrigger
                    key={index}
                    value={selectedQuizObject.sectionAssigned[index]}
                  >
                    {section}
                  </TabsTrigger>
                ))}
            </TabsList>
            {selectedQuizObject &&
              selectedQuizObject.sectionAssigned.map((section, index) => (
                <TabsContent key={index} value={section}>
                  <Card>
                    <CardContent className="space-y-2">
                      <List_Students quizId={selectedQuizObject.id} section={section} />
                    </CardContent>
                    <CardFooter>{/* Your footer */}</CardFooter>
                  </Card>
                </TabsContent>
              ))}
          </Tabs>
          {/* Ending */}
        </CardContent>
      </Card>
    </>
  );
};

export default Quiz_Section;
