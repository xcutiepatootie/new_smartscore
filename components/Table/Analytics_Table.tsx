import {
  getSectionHandled,
  getStudentBySection,
} from "@/lib/server_actions/actions";
import { Student } from "@prisma/client";
import { Card } from "../ui/card";
import { columns } from "./Analytics/columns";
import { DataTable } from "./Analytics/data-table";

async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  const studentsBySection = await getStudentBySection();
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
  const data = await getData();
  const sectionsHandled = await getSectionHandled();
  console.log(sectionsHandled);
  return (
    <>
      <Card className="w-full p-4">
        <DataTable columns={columns} data={data} />
      </Card>
    </>
  );
};

export default Analytics_Table;
