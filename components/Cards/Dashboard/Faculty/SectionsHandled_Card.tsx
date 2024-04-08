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
import {
  getSectionHandled,
  getStudentBySectionCount,
} from "@/lib/server_actions/actions";
import { getServerSession } from "next-auth";
import { config } from "@/lib/auth";

const SectionsHandled_Card = async () => {
  const userSession = await getServerSession(config);
  const sectionHandled = await getSectionHandled();
  const count = await getStudentBySectionCount(sectionHandled);
  console.log("SectionCount", count);
  return (
    <Card className="h-full w-1/4">
      <CardHeader>
        <CardTitle>Sections Handled By {userSession?.user.name}</CardTitle>
        <div className="mx-1 border-b border-amber-500 pb-2 drop-shadow-2xl" />
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full">
            {count.map((sections, index) => (
              <CarouselItem className="h-full" key={index}>
                <div className="flex flex-col items-center justify-center p-4">
                  <Label className="text-2xl">{sections.section}</Label>
                  <Label className="text-3xl">{sections.count} Students</Label>
                </div>
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

export default SectionsHandled_Card;
