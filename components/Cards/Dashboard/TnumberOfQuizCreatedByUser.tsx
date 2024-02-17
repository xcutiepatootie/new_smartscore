import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getData() {
  const responseData = await fetch("http://localhost:3000/api/getlistquiz", {
    method: "POST",
    next: { revalidate: 10 },
  });

  if (!responseData.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await responseData.json();

  console.log("Test DATA:", data);

  return data;
}

const TnumberOfQuizCreatedByUser = async (userSession: any) => {
  const user = userSession;

  async function getData1() {
    const quizzesCreatedByUser = await prisma.quiz.findMany({
      where: { facultyId: user.userSession.id },
      select: { quizName: true },
    });

    if (quizzesCreatedByUser.length === 0) {
      return false;
    }
    return quizzesCreatedByUser;
  }

  const data = await getData1();

  console.log(data);

  return (
    <>
      <Card className="w-[375px] h-[250px]">
        <CardHeader>
          <CardTitle className="line-clamp-2">
            Total Number of Quiz Posted By {user.userSession.name}
          </CardTitle>
          <CardDescription>Card Description </CardDescription>
        </CardHeader>
        <CardContent>
          {data ? (
            <>
              <p>Quiz Posted: </p>
              {data.map((quiz, index) => (
                <p key={index}>{quiz.quizName}</p>
              ))}
            </>
          ) : (
            <p>No quizzes are created by this user.</p>
          )}
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  );
};

export default TnumberOfQuizCreatedByUser;
