import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserUnfinishedQuizzesCount } from "@/lib/server_actions/actions";

const TnumberOfUnfinishedQuiz = async () => {
  const data = await getUserUnfinishedQuizzesCount();
  return (
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
  );
};

export default TnumberOfUnfinishedQuiz;
