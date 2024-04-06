"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sample = [
  {
    name: "Test1",
    section: "10-FC",
    points: 100,
  },
  {
    name: "Test2",
    section: "10-FC",
    points: 90,
  },
  {
    name: "Test3",
    section: "10-FC",
    points: 95,
  },
  {
    name: "Test4",
    section: "10-Reg",
    points: 80,
  },
  {
    name: "Test5",
    section: "10-Reg",
    points: 85,
  },
];

const Ranking_Card = () => {
  return (
    <>
      <Card className="w-2/3">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Ranking</CardTitle>
          <CardDescription>
            Checkout the top 5 performing students
          </CardDescription>
        </CardHeader>
        <Separator className="mx-4 my-2 h-1 bg-amber-200" />
        <CardContent>
          {sample.map((items, index) => (
            <div className="m-4 flex w-full flex-row items-center justify-center gap-2 p-4">
              <div className="flex h-14 w-full basis-16 items-center justify-center rounded-lg border-2 text-center">
                <Label>#{index + 1}</Label>
              </div>
              <div className="flex h-14 w-full flex-row items-center justify-around rounded-lg border-2 bg-[#FFE697]">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Label>{items.name}</Label>
                <Label>{items.section}</Label>
                <Label>{items.points}</Label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Ranking_Card;
