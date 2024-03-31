import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Chart = (quizTitle: { quizTitle: string }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          Chart for{" "}
          <span className="capitalize">
            <>{!quizTitle ? "" : quizTitle.quizTitle}</>
          </span>
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};

export default Chart;
