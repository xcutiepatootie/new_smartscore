"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";

const Quiz_DateAdded = () => {
  return (
    <>
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>
            shows the students of who submitted the quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Quiz Count: {}</p>
        </CardContent>
     
      </Card>
    </>
  );
};

export default Quiz_DateAdded;
