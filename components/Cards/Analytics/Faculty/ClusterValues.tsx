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

const ClusterValues = ({ quizId }: { quizId: string }) => {
  console.log(quizId);
  const [clusterData, setClusterData] = useState([]);

  useEffect(() => {
    if (quizId !== "") {
      const fetchClusterValues = async () => {
        const fetchData = await getClusterValues(quizId);
        console.log("Fetched Clustered Data", fetchData);
        setClusterData(fetchData);
      };

      //method
      fetchClusterValues();
    }
  }, [quizId]);

  console.log("Final Data", clusterData);

  return (
    <div className="space-y-3">
      {clusterData.map((data: any) => (
        <Card>
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
    </div>
  );
};

export default ClusterValues;
