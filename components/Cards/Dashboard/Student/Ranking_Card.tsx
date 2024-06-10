"use client";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Label } from "@/components/ui/label";
//import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getStudentRankingByQuiz,
  getStudentRecords,
} from "@/lib/server_actions/actions";
import prisma from "@/lib/prisma";
import QuizName_Popover from "@/components/Popovers/Student/QuizName_Popover";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { lexend, poppins } from "@/utils/fonts";

type Top5Object = {
  top1: any[];
  top2: any[];
  top3: any[];
  top4: any[];
  top5: any[];
};
const studentRankingByQuiz = async (selectedQuizId: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/student_records?quizId=${selectedQuizId}`,
      { method: "GET" },
    );

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const studentRankingByQuizMapping = async (selectedQuizId: string) => {
  try {
    const apiData = await studentRankingByQuiz(selectedQuizId);
    const mappingData = await getStudentRankingByQuiz(apiData);
    if (mappingData) {
      return mappingData;
    }
  } catch (error) {
    console.log(error);
  }
};

const Ranking_Card = ({
  quizNames,
}: {
  quizNames: { id: string; value: string; label: string }[];
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [top5Object, setTop5Object] = useState<
    | {
        top1: any[];
        top2: any[];
        top3: any[];
        top4: any[];
        top5: any[];
      }
    | undefined
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the selected quiz and set its id
    const selectedQuizObject = quizNames.find(
      (quiz: any) => quiz.value === selectedQuiz,
    );

    if (selectedQuizObject) {
      console.log(selectedQuizObject.id);
      setSelectedQuizId(selectedQuizObject.id);
    } else {
      setSelectedQuizId(""); // Reset id if selected quiz is not found
    }
  }, [selectedQuiz]);

  useEffect(() => {
    if (selectedQuizId !== "") {
      const fetchRanking = async () => {
        const getRanking = await studentRankingByQuizMapping(selectedQuizId);
        console.log(getRanking);
        setTop5Object(getRanking);
      };
      fetchRanking();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      setTop5Object(undefined);
      setLoading(true);
    }
  }, [selectedQuizId]);

  return (
    <>
      <Card className="flex h-auto w-full flex-col max-sm:w-[85%] lg:h-full">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Ranking</CardTitle>
          <CardDescription>
            Checkout the top 5 performing students
          </CardDescription>
          <QuizName_Popover
            popoverValues={quizNames}
            setSelectedQuiz={setSelectedQuiz}
          />
        </CardHeader>
        <CardContent className="">
          <Separator className=" my-2 h-1 bg-amber-200" />

          {loading ? (
            <>
              {!top5Object ? (
                <div className="flex items-center justify-center md:mt-24">
                  <Label
                    className={`${poppins.className} text-center text-2xl`}
                  >
                    Choose a quiz from above to see student rankings.
                  </Label>
                </div>
              ) : (
                <>loading...</>
              )}
            </>
          ) : (
            <>
              {top5Object ? (
                <>
                  {Array.from(Array(5).keys()).map((index) => (
                    <Carousel
                      key={index}
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                    >
                      <div className="m-4 grid grid-cols-1 justify-center gap-2 p-4 md:grid-cols-6">
                        <div className="flex h-14 w-full items-center justify-center rounded-lg border-2 text-center">
                          <Label className="w-full">{`#${index + 1}`}</Label>
                        </div>
                        <div className="col-span-5 ">
                          <CarouselContent className="">
                            {top5Object[
                              `top${index + 1}` as keyof Top5Object
                            ] &&
                              top5Object[`top${index + 1}` as keyof Top5Object]
                                .length > 0 &&
                              top5Object[
                                `top${index + 1}` as keyof Top5Object
                              ].map((student: any, studentIndex: number) => (
                                <CarouselItem
                                  key={studentIndex}
                                  className=" w-max "
                                >
                                  <div className="grid h-auto grid-rows-4 place-content-center content-center rounded-lg border-2 bg-[#FFE697] md:h-14 md:grid-cols-4 ">
                                    <Avatar>
                                      <AvatarImage src="https://github.com/shadcn.png" />
                                      <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Label className="text-center">
                                      {student.name}
                                    </Label>
                                    <Label className="text-center">
                                      {student.section}
                                    </Label>
                                    <Label className="overflow-hidden text-ellipsis text-center">
                                      {student.score}
                                    </Label>
                                  </div>
                                </CarouselItem>
                              ))}
                          </CarouselContent>
                        </div>
                      </div>
                    </Carousel>
                  ))}
                </>
              ) : (
                <>Error</>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Ranking_Card;
