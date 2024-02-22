import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

const TnumberOfQuiz = async ({ userSession }: any) => {
  const user = userSession;
  let user_section: any = null;
  if (user.role === "student") {
    const { section } = userSession?.userSection;
    user_section = section;
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
      <Card className="">
        <CardHeader>
          <CardTitle>Total Number of Quiz</CardTitle>
          <CardDescription>
            shows the number of available quiz for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Quiz Count: {data}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default TnumberOfQuiz;
