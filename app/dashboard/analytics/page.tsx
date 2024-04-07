import Analytics_tabs from "@/components/Cards/Analytics/Faculty/Tabs/Analytics_tabs";
import Student_Analytics from "@/components/Cards/Analytics/Student/Student_Analytics";

import { config } from "@/lib/auth";
import {
  getQuizNames,
  getStudentClusterAssignments,
  quizSection_Card,
} from "@/lib/server_actions/actions";
import { getServerSession } from "next-auth";

export default async function page() {
  const getAllQuiz = await quizSection_Card();
  const getUserSession = await getServerSession(config);

  let quizNames;
  if (getUserSession?.user.role === "student") {
    quizNames = await getQuizNames();
    console.log(quizNames);
  }

  return (
    <>
      {getUserSession?.user.role === "faculty" ? (
        <div className="w-full">
          <Analytics_tabs />
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 pt-2">
          {/*     <StudentAnalytics_Tabs /> */}
          {quizNames && <Student_Analytics quizNames={quizNames} />}
        </div>
      )}
    </>
  );
}
