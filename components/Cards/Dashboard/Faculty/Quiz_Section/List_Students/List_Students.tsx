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

interface StudentWithStatus extends Student {
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
      <div className="my-2">
        <h2>Students in Section {section}</h2>
        <Table>
          <TableCaption>
            A list of your students who taken the quiz.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="text-right">{student.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/*     <ul>
          {students.map((student) => (
            <li key={student.id}>
              Name: {student.name}, Email: {student.email}
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export default List_Students;
