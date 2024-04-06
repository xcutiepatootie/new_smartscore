import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { MdAssignment } from "react-icons/md";

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
    <Card className="h-[180] w-[375px] max-sm:w-[85%]">
      <CardHeader className="">
        <CardTitle className="line-clamp-2 flex flex-row text-lg">
          <div className="flex w-full flex-row justify-between">
            Quizzes Posted By {user.userSession.name}
            <span className="">
              <MdAssignment className="text-4xl text-emerald-400" />
            </span>
          </div>
        </CardTitle>
        <div className="mx-1 border-b border-amber-500 pb-2 drop-shadow-2xl" />
      </CardHeader>
      <CardContent>
        {data ? (
          <>
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
  );
};

export default TnumberOfQuizCreatedByUser;
