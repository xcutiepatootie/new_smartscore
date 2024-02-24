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
          <CardTitle>Total Number of Quiz</CardTitle>
          <CardDescription>
            shows the number of available quiz for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Quiz Count: {}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default Quiz_DateAdded;
