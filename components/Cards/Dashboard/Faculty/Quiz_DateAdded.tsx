import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getQuizTakenHistory } from "@/lib/server_actions/actions";
import { lexend, poppins } from "@/utils/fonts";
import React from "react";

const Quiz_DateAdded = async () => {
  const quizHistory = await getQuizTakenHistory();
  console.log("======================");
  console.log(JSON.stringify(quizHistory, null, 2));
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
        <CardContent className="">
          <ScrollArea className="h-[550px] w-auto">
            <div className="space-y-4">
              {quizHistory.map((history) => (
                <Card className="h-auto w-full p-1" key={history.id}>
                  <CardTitle className={`${lexend.className} p-4 text-xl`}>
                    Quiz Submitted: {history.quizName}
                  </CardTitle>
                  <CardContent className="flex flex-col">
                    <Label className={`${poppins.className} text-lg`}>
                      Submitted by: {history.student?.name}
                    </Label>
                    <Label className={`${poppins.className} text-md`}>
                      Section: {history.student?.section}
                    </Label>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          {/*  */}
        </CardContent>
      </Card>
    </>
  );
};

export default Quiz_DateAdded;
