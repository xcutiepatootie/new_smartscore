import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClusterValues } from "@/lib/server_actions/actions";
import { clusterType } from "@/types/types";

const clusterValues = async (quizId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/cluster/average-values?quizId=${quizId}`,

      {
        method: "GET",
      },
    );

    if (response.ok) {
      console.log(response);
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const ClusterValues = ({ quizId }: { quizId: string }) => {
  console.log(quizId);
  const [clusterData, setClusterData] = useState<clusterType>([]);

  useEffect(() => {
    if (quizId !== "") {
      const fetchClusterValues = async () => {
        const fetchData = await clusterValues(quizId);
        console.log("Fetched Clustered Data", fetchData);
        setClusterData(fetchData);
      };

      //method
      fetchClusterValues();
    }
  }, [quizId]);

  console.log("Final Data", clusterData);

  return (
    <>
      {clusterData.map((data: any) => (
        <Card key={data.clusterNumber}>
          <CardHeader>
            <CardTitle>Cluster {data.clusterNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Score: {parseFloat(data.attributeAverages.score).toFixed(2)}</p>
            <p>Time: {data.attributeAverages.time}</p>
            <p>Out of Focus: {data.attributeAverages.out_of_focus}</p>
            <p>Answers Clicked: {data.attributeAverages.answers_clicked}</p>
            <p>Retries Left: {data.attributeAverages.retriesLeft}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ClusterValues;
