import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import CounterUpComponent from "./Student/CountUp/CounterUpComponent";
import { Label } from "@/components/ui/label";

const TnumberOfQuiz = async ({ userSession }: any) => {
  const user = userSession;
  let user_section: any = null;
  if (user.role === "student") {
    user_section = userSession?.userSection;
  }

  async function getData() {
    const quizzesCreatedByUser = await prisma.quiz.count({
      where: { sectionAssigned: { has: user_section } },
    });

    console.log(quizzesCreatedByUser);
    return quizzesCreatedByUser;
  }
  const data = await getData();

  return (
    <>
      <Card className="flex h-full w-full flex-col max-sm:w-[85%]">
        <CardHeader>
          <CardTitle>Total Number of Quiz</CardTitle>
          <CardDescription>
            shows the number of available quiz for you!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-center">
          <CounterUpComponent data={data} />
          <Label> Quizzes</Label>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default TnumberOfQuiz;
