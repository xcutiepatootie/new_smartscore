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
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <Card className="h-full w-full max-sm:w-[85%]">
        <CardHeader>
          <CardTitle>Quiz Status</CardTitle>
          <CardDescription>
            shows the list of students which is assigned per section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Quiz_section_Popover
            quizzes={quizzes}
            setSelectedQuiz={setSelectedQuiz}
          />
          {/* Render Here The Quiz And Section */}
          <Tabs className="w-auto py-2">
            <div className="overflow-x-auto">
              <TabsList className="flex w-max flex-row justify-around">
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
            </div>
            {selectedQuizObject &&
              selectedQuizObject.sectionAssigned.map((section, index) => (
                <TabsContent key={index} value={section}>
                  <Card>
                    <CardContent className="space-y-2">
                      <ScrollArea className="h-[390px] w-auto">
                        <List_Students
                          quizId={selectedQuizObject.id}
                          section={section}
                        />
                      </ScrollArea>
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
