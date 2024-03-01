import Analytics_Table from "@/components/Table/Analytics_Table";
import { config } from "@/lib/auth";
import {
  faculty_analytics,
  getQuizzesList_faculty,
  quizSection_Card,
} from "@/lib/server_actions/actions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import React from "react";

export default async function page() {
  const getAllQuiz = await quizSection_Card();
  const getUserSession = await getServerSession(config);
  console.log(getUserSession);

  /*  const studentCluster = await faculty_analytics();
  console.log(studentCluster); */
  return (
    <>
      {getUserSession?.user.role === "faculty" ? (
        <div className="flex flex-row w-full">
          <div className="flex h-full w-[60%]">
            <Analytics_Table />
          </div>

          <div>
            {/*  {studentCluster.map((student: any, index: number) => (
            <React.Fragment key={index}>
              <h1>{student.studentId}</h1>
              <h2>{student.cluster}</h2>
            </React.Fragment>
          ))} */}
          </div>
        </div>
      ) : (
        <>Student Analytics</>
      )}
    </>
  );
}
