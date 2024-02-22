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
  const { section } = userSession?.userSection;

  async function getData() {
    const quizzesCreatedByUser = await prisma.quiz.count({
      where: { sectionAssigned: { has: section } },
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
          <CardDescription>shows the number of available quiz for you!</CardDescription>
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
