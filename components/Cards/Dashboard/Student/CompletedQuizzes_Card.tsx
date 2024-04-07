import { getUserCompletedQuizzes } from "@/lib/server_actions/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { Label } from "@/components/ui/label";

const CompletedQuizzes_Card = async () => {
  const getQuizzes = await getUserCompletedQuizzes();
  console.log(getQuizzes);
  return (
    <Card className="h-full w-1/4">
      <CardHeader>
        <CardTitle>Completed Quizzes</CardTitle>
        <CardDescription>
          shows the quizzes that yoo already finished!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full">
            {getQuizzes.map((quiz) => (
              <CarouselItem className="h-full" key={quiz.id}>
                <table className="w-full h-full">
                  <thead className="bg-yellow-200">
                    <tr className=" ">
                      <th className="px-3 py-2 text-center">Name</th>
                      <th className="px-3 py-2 text-center">Subject</th>
                      <th className="px-3 py-2 text-center">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#FBEFCA]" key={quiz.id}>
                      <td className="px-3 py-2 text-center">
                        <Label>{quiz.quiz.quizName}</Label>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Label>{quiz.quiz.subject}</Label>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Label>{quiz.isDone ? "Done" : "Not Done"}</Label>
                      </td>
                    </tr>
                  </tbody>
                  {/* <div className="flex h-full w-full items-center justify-around space-x-4 bg-[#FADB7B]">
                    <Label className="text-center">Quiz Name</Label>
                    <Label className="text-center">Subject</Label>
                    <Label className="text-center">Status</Label>
                  </div>
                  <div className="flex w-full items-center justify-around space-x-4 bg-[#FBEFCA]">
                    <Label className="text-center">{quiz.quiz.quizName}</Label>
                    <Label className="text-center">{quiz.quiz.subject}</Label>
                    <Label className="text-center">
                      {quiz.isDone ? "Done" : "Not Done"}
                    </Label>
                  </div> */}
                </table>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default CompletedQuizzes_Card;
