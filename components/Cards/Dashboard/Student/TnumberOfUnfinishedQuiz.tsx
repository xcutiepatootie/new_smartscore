import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserUnfinishedQuizzesCount } from "@/lib/server_actions/actions";
import CounterUpComponent from "./CountUp/CounterUpComponent";
import { Label } from "@/components/ui/label";

const TnumberOfUnfinishedQuiz = async () => {
  const data = await getUserUnfinishedQuizzesCount();
  return (
    <Card className="flex h-full w-full flex-col max-sm:w-[85%]">
      <CardHeader>
        <CardTitle className="text-xl">
          Total Number of Unfinished Quiz
        </CardTitle>
        <CardDescription>
          shows the number of unfinished quizzes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-center">
        <CounterUpComponent data={data} />
        <Label> Quizzes</Label>
      </CardContent>
    </Card>
  );
};

export default TnumberOfUnfinishedQuiz;
