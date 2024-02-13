import ListQuiz from "@/components/Quizzes/ListQuiz/ListQuiz";
import React from "react";

export default function page() {
  return (
    <div className="container w-screen h-[80vh] mx-auto mt-4 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
      <ListQuiz />
    </div>
  );
}
