import Analytics_Table from "@/components/Cards/Analytics/Faculty/Analytics_Components";
import Analytics_tabs from "@/components/Cards/Analytics/Faculty/Tabs/Analytics_tabs";
import StudentAnalytics_Tabs from "@/components/Tabs/StudentAnalytics_Tabs";
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
        <div className="w-full">
          <Analytics_tabs />
        </div>
      ) : (
        <div className="w-full">
          <StudentAnalytics_Tabs />
        </div>
      )}
    </>
  );
}
