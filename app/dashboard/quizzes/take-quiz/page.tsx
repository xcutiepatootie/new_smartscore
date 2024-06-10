import { Take_Quiz } from "@/components/Quizzes/Take_Quiz/Take_Quiz";
import { getSelectedQuiz } from "@/lib/server_actions/actions";

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

  return (
    <>
      <Take_Quiz selectedQuiz={fetchedQuiz} quizId={selectedQuiz} />
    </>
  );
}
