import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  getQuizTakenHistory,
  getUserQuizTakenHistory,
} from "@/lib/server_actions/actions";
import { lexend, poppins } from "@/utils/fonts";
import { FaStickyNote } from "react-icons/fa";

import { config } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FaCalendarCheck, FaClock } from "react-icons/fa";

const Quiz_DateAdded = async () => {
  const userSession = await getServerSession(config);
  const quizHistory = await getQuizTakenHistory();
  console.log("======================");
  console.log(JSON.stringify(quizHistory, null, 2));
  console.log("======================");

  let userQuizHistory;
  if (userSession?.user.role === "student") {
    userQuizHistory = await getUserQuizTakenHistory();
  }
  return (
    <>
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          {userSession?.user.role === "faculty" ? (
            <CardDescription>
              shows the students of who submitted the quiz
            </CardDescription>
          ) : (
            <CardDescription>
              shows your history of submitting the quiz
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="">
          <ScrollArea className="h-[550px] w-auto">
            <div className="space-y-4">
              {userSession?.user.role === "faculty" ? (
                <>
                  {quizHistory.length < 1 ? (
                    <Label>Students have not yet responded to the quiz.</Label>
                  ) : (
                    <>
                      {" "}
                      {quizHistory.map((history) => (
                        <Card className="h-auto w-full p-1" key={history.id}>
                          <CardTitle
                            className={`${lexend.className} flex items-center p-2 text-xl`}
                          >
                            <FaStickyNote
                              size={25}
                              className="mr-2 text-yellow-400"
                            />{" "}
                            Quiz Submitted: {history.quizName}
                          </CardTitle>
                          <Separator className="my-2 bg-amber-300 " />
                          <CardContent className="flex flex-col">
                            <Label className={`${poppins.className} text-lg`}>
                              Submitted by: {history.student?.name}
                            </Label>
                            <Label className={`${poppins.className} text-md`}>
                              Section: {history.student?.section}
                            </Label>
                            <div className="ml-6 flex w-full flex-row space-x-8 p-2">
                              <Label className="flex w-full items-center gap-2">
                                <FaClock size={20} />
                                {history.dateTaken.toLocaleTimeString()}
                              </Label>
                              <Label className="flex w-full items-center gap-2">
                                <FaCalendarCheck size={20} />
                                {history.dateTaken.toLocaleDateString()}
                              </Label>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {userQuizHistory?.map((quiz, index) => (
                    <Card className="h-auto w-full p-1" key={quiz.id}>
                      <CardTitle
                        className={`${lexend.className} flex items-center p-2 text-xl`}
                      >
                        <FaStickyNote
                          size={25}
                          className="mr-2 text-yellow-400"
                        />{" "}
                        Quiz Submitted: {quiz.quizName}
                      </CardTitle>
                      <Separator className="my-2 bg-amber-300 " />
                      <CardContent className="flex flex-col">
                        {/*  <Label className={`${poppins.className} text-lg`}>
                          Submitted by: {history.student?.name}
                        </Label>
                        <Label className={`${poppins.className} text-md`}>
                          Section: {history.student?.section}
                        </Label> */}
                        <div className="ml-6 flex w-full flex-row space-x-8 p-2">
                          <Label className="flex w-full items-center gap-2">
                            <FaClock size={20} />
                            {quiz.dateTaken.toLocaleTimeString()}
                          </Label>
                          <Label className="flex w-full items-center gap-2">
                            <FaCalendarCheck size={20} />
                            {quiz.dateTaken.toLocaleDateString()}
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
          {/*  */}
        </CardContent>
      </Card>
    </>
  );
};

export default Quiz_DateAdded;
