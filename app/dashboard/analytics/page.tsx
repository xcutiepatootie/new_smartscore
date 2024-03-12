import Analytics_Table from "@/components/Cards/Analytics/Faculty/Analytics_Components";
import { config } from "@/lib/auth";
import { quizSection_Card } from "@/lib/server_actions/actions";
import { getServerSession } from "next-auth";

export default async function page() {
  const getAllQuiz = await quizSection_Card();
  const getUserSession = await getServerSession(config);
  console.log(getUserSession);

  return (
    <>
      {getUserSession?.user.role === "faculty" ? (
        <div className="flex flex-row w-full">
          <div className="flex h-full w-[100%] space-x-2">
            <Analytics_Table />
          </div>
        </div>
      ) : (
        <>Student Analytics</>
      )}
    </>
  );
}
