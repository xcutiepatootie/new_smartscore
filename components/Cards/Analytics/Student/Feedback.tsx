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
        <Label>
          You belong to Cluster:
          {feedback ? feedback.cluster + 1 : "(Not yet Available / Not Ready)"}
        </Label>
        <br />
        <Label>
          Your teacher&apos;s feedback:
          {feedback ? feedback.feedback : "(Not yet Available / Not Ready)"}
        </Label>
      </CardContent>
    </Card>
  );
};

export default Feedback;
