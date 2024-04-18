import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import ClientRendered from "./ClientRendered";
import { getQuizNames_Admin } from "@/lib/server_actions/actions";

const AdminPanel = async () => {
  const quizzes = await getQuizNames_Admin();
  return (
    <Card>
      <CardHeader>Admin Panel</CardHeader>
      <CardDescription>Testingparen</CardDescription>
      <CardContent>
        <ClientRendered quizzes={quizzes} />
      </CardContent>
    </Card>
  );
};

export default AdminPanel;
