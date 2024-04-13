"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Student } from "@prisma/client";
import { tableData_faculty } from "@/types/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<tableData_faculty>[] = [
 
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
 /*  {
    accessorKey: "studentId",
    header: "Student Id",
  }, */
  {
    accessorKey: "section",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Section
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "time",
    header: "Time (In Seconds)",
  },
  {
    accessorKey: "outOfFocus",
    header: "Out of Focus",
  },
  {
    accessorKey: "answersClicked",
    header: "Answers Clicked/Changes",
  },
  {
    accessorKey: "retriesLeft",
    header: "Retries Left",
  },
  {
    accessorKey: "clusterAssignment",
    header: () => <div className="">Cluster Assignment</div>,
    cell: ({ row }) => {
      const assignment: number = row.getValue("clusterAssignment");
      // row.getValue("clusterAssignment")

      return (
        <div className="text-right font-medium">Cluster: {assignment + 1}</div>
      );
    },
  },
];
