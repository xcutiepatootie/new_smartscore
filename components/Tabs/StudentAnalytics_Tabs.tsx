import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const StudentAnalytics_Tabs = () => {
  return (
    <div>
      {" "}
      <Tabs defaultValue="records" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="records">Student Records</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        <TabsContent className="w-[100%]" value="records">
          <div className="flex flex-row w-full">
            <div className="flex h-full w-[100%] space-x-2">Records</div>
          </div>
        </TabsContent>
        <TabsContent value="feedback">View Feedback here.</TabsContent>
        <TabsContent value="charts">
          View Charts.
          {/* <Charts quizzes={quizzes} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAnalytics_Tabs;
