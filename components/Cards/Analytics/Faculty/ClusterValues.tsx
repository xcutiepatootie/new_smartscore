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
import { Label } from "@/components/ui/label";

const clusterValues = async (quizId: string) => {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_API_URL}/api/cluster/average-values-hc?quizId=${quizId}`,

      {
        method: "GET",
      },
    );

    if (response.ok) {
      console.log(response);
      return response.json();
    } else {
      return "Not Enough Instances to Cluster";
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
      {Array.isArray(clusterData) ? (
        <>
          {clusterData.map((data: any) => (
            <Card key={data.clusterNumber}>
              <CardHeader>
                <CardTitle>Cluster {data.clusterNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Score: {parseFloat(data.attributeAverages.score).toFixed(2)}
                </p>
                <p>Time: {data.attributeAverages.time}</p>
                <p>Out of Focus: {data.attributeAverages.out_of_focus}</p>
                <p>Answers Clicked: {data.attributeAverages.answers_clicked}</p>
                <p>Retries Left: {data.attributeAverages.retriesLeft}</p>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          <Label className="text-xl text-center w-full">{clusterData}</Label>
          <br />
          <Label className="text-xl">
            Please wait until some students submitted the quiz
          </Label>
        </>
      )}
    </>
  );
};

export default ClusterValues;
