import prisma from "@/lib/prisma";
import { student_sectionList } from "@/lib/server_actions/actions";
import { Student } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListStudent_Table from "@/components/Table/Dashboard/Faculty/ListStudent_Table";

export interface StudentWithStatus extends Student {
  status: string; // Add the status field
}

const List_Students = ({
  section,
  quizId,
}: {
  section: string;
  quizId: string;
}) => {
  const [students, setStudents] = useState<StudentWithStatus[]>([]);
  console.log(section);

  useEffect(() => {
    const fetchStudents = async () => {
      const getStudents = await student_sectionList(section, quizId);
      setStudents(getStudents);
    };
    fetchStudents();
  }, []);
  console.log(students);
  return (
    <>
      <div className="my-2 w-full">
        {/*  <h2>Students in Section {section}</h2> */}

        <ListStudent_Table dataq={students} quizId={quizId} />
      </div>
    </>
  );
};

export default List_Students;
