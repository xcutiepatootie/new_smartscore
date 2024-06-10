import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

const Feedback_Admin = ({ feedback }: any) => {
  console.log("Feedback", feedback);
  return (
    <Card className="h-full ">
      <CardHeader>
        <CardTitle>Teacher&apos;s Feedback</CardTitle>
        <CardDescription>
          shows the feedback given by the instructor.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {!feedback ? (
          <div className="mt-2 flex items-center justify-center md:mt-28">
            <Label className="text-2xl">Please Select A Quiz</Label>
          </div>
        ) : (
          <>
            {/*  <Label>
              You belong to Cluster:
              <span className="text-lg italic">
                {feedback
                  ? ` Cluster - ${feedback.cluster + 1}`
                  : " The Cluster isn't prepared just yet. Kindly wait until many of your classmates have completed the quiz."}
              </span>
            </Label> */}
            <br />
            <Label>
              Teacher&apos;s feedback:
              <span className="text-lg italic">
                {feedback
                  ? feedback.PostedFeedbacks.map(
                      (feedbacks: any, index: number) => (
                        <>
                          Cluster{index + 1}:{feedbacks}
                        </>
                      ),
                    )
                  : " The instructor hasn't yet posted any feedback."}
              </span>
            </Label>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Feedback_Admin;
