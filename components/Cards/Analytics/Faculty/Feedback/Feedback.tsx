import { ScrollArea } from "@/components/ui/scroll-area";
import Quiz_section_Popover from "@/components/Cards/Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Feedback_Input from "./Contents/Feedback_Input";
import { getClusterValues } from "@/lib/server_actions/actions";

export default async function Feedback({ quizzes }: any) {
  return (
    <Card>
      <CardHeader>Feedback</CardHeader>
      <CardContent>
        <ScrollArea className="h-[780px] w-auto rounded-md border p-4">
          <Feedback_Input quizzes={quizzes} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
