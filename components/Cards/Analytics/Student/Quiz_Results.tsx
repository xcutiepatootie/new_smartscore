import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Quiz_Results = ({ results }: any) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quiz Result</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        {!results ? (
          <div className="mt-28 flex items-center justify-center">
            <Label className="text-2xl">Please Select A Quiz</Label>
          </div>
        ) : results.QuizTaken.length < 1 ? (
          <div className="mt-28 flex items-center justify-center">
            <Label className="text-2xl">
              No Record Found. Please answer the quiz first.
            </Label>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center ">
              <Separator />
              <Label className="text-2xl">{results.quizName}</Label>
              <Label className="text-xl">
                Posted By: {results.facultyName}
              </Label>
              {results.QuizTaken.map((quiz: any) => (
                <div className="flex w-full flex-col">
                  <Label className="text-center text-xl">
                    Is Perfect? {quiz.isPerfect ? "Perfect" : "Not Perfect"}
                  </Label>
                  <Label className="text-center text-xl">
                    Retries Left: {quiz.retriesLeft}
                  </Label>
                  <Separator className="my-4 w-full" />
                  <div className="flex items-center justify-center">
                    <ScrollArea className="w-full h-40">
                      <div className="flex flex-row items-center justify-center space-x-8">
                        {quiz.results.map((result: any, index: number) => (
                          <Card className="h-[128px] w-[256px] bg-[#FADB7B] p-1">
                            <CardContent className="flex flex-col">
                              <div
                                className="flex flex-col items-center justify-center"
                                key={index}
                              >
                                {index + 1 === 1 ? (
                                  <Label className="text-lg">
                                    Initial Take
                                  </Label>
                                ) : (
                                  <Label className="text-lg">
                                    Try #{index}
                                  </Label>
                                )}

                                <Label className="text-md">
                                  Answers Clicked: {result.answers_clicked}
                                </Label>
                                <Label className="text-md">
                                  Out of Focus: {result.out_of_focus}
                                </Label>
                                <Label className="text-md">
                                  Score: {result.score}
                                </Label>
                                <Label className="text-md">
                                  Time: {result.timeStr}
                                </Label>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <ScrollBar orientation="horizontal" />
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              ))}
              {/* <Label>{results.Qui}</Label>
            <Label>{results.quizName}</Label> */}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz_Results;
