import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";



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
      <Card className="w-[375px] h-[180]">
        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg">
             Quizzes Posted By {user.userSession.name}
          </CardTitle>
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
