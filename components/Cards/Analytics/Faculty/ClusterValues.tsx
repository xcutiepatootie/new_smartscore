import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ClusterValues = ({ quizId }: { quizId: string }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Total Number of Quiz</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Quiz Count: </p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClusterValues;
