import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getQuizTakenHistory } from "@/lib/server_actions/actions";
import React from "react";

const Quiz_DateAdded = async () => {
  const testquiz = await getQuizTakenHistory();
  console.log("======================");
  console.log(JSON.stringify(testquiz, null, 2));
  console.log("======================");
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
