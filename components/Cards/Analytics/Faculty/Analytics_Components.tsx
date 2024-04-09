import {
  getSectionHandled,
  getStudentBySection,
  quizSection_Card,
} from "@/lib/server_actions/actions";
import { Student } from "@prisma/client";
import Client_table from "../../../Table/Analytics/Client_table";

async function getData(sectionsHandled: string[]): Promise<Student[]> {
  // Fetch data from your API here.
  const studentsBySection = await getStudentBySection(sectionsHandled);

  return studentsBySection;
}

const Analytics_Table = async () => {
  const sectionsHandled = await getSectionHandled();
  const data = await getData(sectionsHandled);

  const quizzes: any = await quizSection_Card();
  console.log("data:", data);
  console.log(sectionsHandled);
  console.log("Quizzes:", quizzes);
  return (
    <>
      <div className="w-full">
        <Client_table data={data} quizzes={quizzes} />
      </div>
    </>
  );
};

export default Analytics_Table;
