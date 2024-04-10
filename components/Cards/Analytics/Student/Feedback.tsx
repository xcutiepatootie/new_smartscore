import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Feedback = ({ feedback }: any) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Teacher&apos;s Feedback</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        {feedback.length < 1 ? (
          <Label>Please Select a Quiz</Label>
        ) : (
          <>
            <Label>
              You belong to Cluster:
              {feedback
                ? feedback.cluster + 1
                : "The Cluster is not yet ready. Please wait until your other classmates answered the quiz."}
            </Label>
            <br />
            <Label>
              Your teacher&apos;s feedback:
              {feedback
                ? feedback.feedback
                : "The Teacher does not posted a feedback yet."}
            </Label>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Feedback;
