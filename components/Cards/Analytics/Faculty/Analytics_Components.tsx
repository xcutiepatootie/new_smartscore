import {
  getSectionHandled,
  getStudentBySection,
  quizSection_Card,
} from "@/lib/server_actions/actions";
import { Student } from "@prisma/client";
import { Card } from "../../../ui/card";
import Client_table from "../../../Table/Analytics/Client_table";
import { columns } from "../../../Table/Analytics/columns";
import { DataTable } from "../../../Table/Analytics/data-table";
import ClusterValues from "./ClusterValues";

async function getData(sectionsHandled: string[]): Promise<Student[]> {
  // Fetch data from your API here.
  const studentsBySection = await getStudentBySection(sectionsHandled);

  return studentsBySection;
}
/* [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "ma@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "b@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },

    // ...
  ]; */

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
        {/* <DataTable columns={columns} data={data} quizzes={quizzes} /> */}
      </div>
      {/* <div className="w-[20%]">
        <Card className="w-auto h-[800px] p-4">
          <ClusterValues />
        </Card>
      </div> */}
    </>
  );
};

export default Analytics_Table;
