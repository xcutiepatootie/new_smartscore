"use client";
import ClusterValues from "@/components/Cards/Analytics/Faculty/ClusterValues";
import Quiz_section_Popover from "@/components/Cards/Dashboard/Faculty/Quiz_Section/Quiz_section_Popover/Quiz_section_Popover";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getQuizTaken } from "@/lib/server_actions/actions";
import { tableData_faculty } from "@/types/types";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const studentRecords = async (quizId: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/student_records?quizId=${quizId}`,

      {
        method: "GET",
      },
    );

    if (response.ok) {
      console.log(response);
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const studentClusterAssignments = async (quizId: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/assignments_hc?quizId=${quizId}`,

      {
        method: "GET",
      },
    );

    if (response.ok) {
      console.log(response);
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

function Client_table({ data, quizzes }: any) {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>(""); // State to store the selected quiz id
  const [finData, setFinData] = useState<tableData_faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to store the selected quiz id

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizzes.find(
      (quiz: any) => quiz.quizName.toLowerCase() === selectedQuiz,
    );

    if (selectedQuizObject) {
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz]);

  useEffect(() => {
    setLoading(true);
    if (selectedQuizId) {
      const fetchQuizTaken = async () => {
        const fetchData = await getQuizTaken(selectedQuizId);
        const fetchData_CO = await studentRecords(selectedQuizId);
        const fetchClusterAssignment =
          await studentClusterAssignments(selectedQuizId);
        console.log(fetchData);
        console.log(fetchData_CO);

        const finalData = fetchData.map((studentData) => ({
          email: studentData.student?.email,
          name: studentData.student?.name,
          studentId: studentData.student?.studentId,
          section: studentData.student?.section,
        }));

        const finalData_CO = fetchData_CO.map((studentData: any) => ({
          studentId: studentData.studentId,
          score: parseFloat(studentData.averageScore).toFixed(2),
          time: parseFloat(studentData.averageTime).toFixed(2),
          outOfFocus: parseFloat(studentData.averageOutOfFocus).toFixed(2),
          answersClicked: studentData.totalAnswersClicked,
          retriesLeft: studentData.averageRetriesLeft,
        }));

        const combinedData = finalData
          .map((data) => {
            const matchingData_CO = finalData_CO.find(
              (coData: any) => coData.studentId === data.studentId,
            );
            if (matchingData_CO) {
              return {
                ...data,
                score: matchingData_CO.score,
                time: matchingData_CO.time,
                outOfFocus: matchingData_CO.outOfFocus,
                answersClicked: matchingData_CO.answersClicked,
                retriesLeft: matchingData_CO.retriesLeft,
              };
            } else {
              return null; // Return null if no matching data found
            }
          })
          .filter((data) => data !== null);
        // Filter out null entries

        const studentRecord = combinedData.map((data) => {
          const matchingClusterData = fetchClusterAssignment.find(
            (clusterData: any) => clusterData.studentId === data?.studentId,
          );
          if (matchingClusterData) {
            return {
              ...data,
              clusterAssignment: matchingClusterData.cluster, // Assuming clusterAssignment is the property to be added
            };
          } else {
            return data; // Keep the original data if no matching cluster data found
          }
        });

        console.log(fetchClusterAssignment);
        console.log(finalData);
        console.log("Final Score: ", finalData_CO);
        console.log("Combined Data: ", combinedData);
        console.log("Student Record: ", studentRecord);

        return studentRecord;
      };

      setTimeout(() => {
        fetchQuizTaken().then((fetchedData) => {
          console.log(fetchedData);
          /*    if (fetchedData.length === 0) {
            setFinData([]);
          } else { */
          setFinData(fetchedData as []);
          /*  } */
          setLoading(false);
        });
      }, 2000);
    }
  }, [selectedQuizId]);

  console.log(finData);

  return (
    <>
      <div className="flex w-full flex-col max-lg:space-y-2 lg:flex-row lg:space-x-2">
        <div className="w-full lg:w-[80%]">
          <Card className="h-[800px] w-auto p-4">
            <Quiz_section_Popover
              quizzes={quizzes}
              setSelectedQuiz={setSelectedQuiz}
            />
            {selectedQuizId.length > 0 && !loading ? (
              <div>
                <DataTable columns={columns} data={finData} />
              </div>
            ) : selectedQuizId.length > 0 && loading ? (
              <div>loading...</div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <h1>Please Select A Quiz</h1>
              </div>
            )}
          </Card>
        </div>
        <div>
          <Card className="h-[800px] w-auto p-4 ">
            <CardTitle className="py-2">Cluster Values</CardTitle>
            <CardDescription className="py-2">
              shows the average value of each attribute for each cluster
            </CardDescription>
            <ClusterValues quizId={selectedQuizId} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default Client_table;
