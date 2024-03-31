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
        <CardTitle>Teacher's Feedback</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>You belong to Cluster:{feedback.cluster + 1}</Label>
        <br />
        <Label>Your teacher's feedback:{feedback.feedback}</Label>
      </CardContent>
    </Card>
  );
};

export default Feedback;
