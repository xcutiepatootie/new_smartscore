import { Update_Quiz } from "@/components/Quizzes/UpdateQuiz/Update_Quiz";
import { getSections, getSelectedQuiz } from "@/lib/server_actions/actions";
import React from "react";

interface SearchParams {
  quizId?: { [key: string]: string | string[] | null | undefined };
}

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const selectedQuiz: any = searchParams?.quizId;

  const fetchedQuiz: any = await getSelectedQuiz(selectedQuiz);
  const allSection = await getSections();

  console.log(fetchedQuiz);
  return (
    <div className="">
      <Update_Quiz selectedQuiz={fetchedQuiz} studentSection={allSection} />
    </div>
  );
}
