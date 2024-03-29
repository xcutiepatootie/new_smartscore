"use client";
import { StudentWithStatus } from "@/components/Cards/Dashboard/Faculty/Quiz_Section/List_Students/List_Students";
import { tableData_faculty } from "@/types/types";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { student_sectionList } from "@/lib/server_actions/actions";

function ListStudent_Table({
  section,
  quizId,
}: {
  section: string;
  quizId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentWithStatus[]>([]);

  useEffect(() => {
    const setData = async () => {
      const fetchData = await student_sectionList(section, quizId);
      setStudents(fetchData);
    };
    setData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [section]);

  console.log(students);

  return (
    <>
      <div className="flex w-full flex-row space-x-2">
        <div className="w-[100%] p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {section && <DataTable columns={columns} data={students} />}
              {/*  <Card className="h-[800px] w-auto p-4"></Card> */}
            </>
          )}

          {/*  <Card className="h-[800px] w-auto p-4"></Card> */}
        </div>
      </div>
    </>
  );
}

export default ListStudent_Table;
