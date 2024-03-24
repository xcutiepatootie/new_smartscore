import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import Analytics_Table from "../Analytics_Components";
import Charts from "../Charts";
import { quizSection_Card } from "@/lib/server_actions/actions";
import Feedback from "../Feedback/Feedback";

const Analytics_tabs = async () => {
  const quizzes: any = await quizSection_Card();

  return (
    <Tabs defaultValue="records" className="w-[100%]">
      <TabsList>
        <TabsTrigger value="records">Student Records</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>
      <TabsContent className="w-[100%]" value="records">
        <div className="flex flex-row w-full">
          <div className="flex h-full w-[100%] space-x-2">
            <Analytics_Table />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="feedback">
        Provide Feedback here.
        <Feedback />
      </TabsContent>
      <TabsContent value="charts">
        View Charts.
        <Charts quizzes={quizzes} />
      </TabsContent>
    </Tabs>
  );
};

export default Analytics_tabs;
