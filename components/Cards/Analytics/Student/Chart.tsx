import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { ScrollArea } from "@/components/ui/scroll-area";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Student Cluster Assignment",
    },
  },
};

export const barOptions = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Results by {Selected Attribute}",
    },
  },
};

const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

const Chart = ({
  quizTitle,
  clusterAssignments,
}: {
  quizTitle: string;
  clusterAssignments: [{ studentId: string; cluster: number }];
}) => {
  console.log(clusterAssignments);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#FAC898",
          "#FBEFCA",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [clusterCounts, setClusterCounts] = useState<number[]>([]);
  const [uniqueLabels, setUniqueLabels] = useState<number[]>([]);
  const [clusterAssignment, setClusterAssignment] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Students in this cluster",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#FAC898",
          "#FBEFCA",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (clusterAssignments) {
      const uniqueLabels = Array.from(
        new Set(clusterAssignments.map((data) => data.cluster)),
      ).sort();
      setUniqueLabels(uniqueLabels);

      const counts: number[] = Array(uniqueLabels.length).fill(0);
      clusterAssignments.forEach((data) => {
        counts[data.cluster] += 1;
      });
      setClusterCounts(counts);

      const newDataset = {
        ...clusterAssignment.datasets[0],
        data: counts,
      };
      const newClusterAssignment = {
        ...clusterAssignment,
        labels: uniqueLabels,
        datasets: [newDataset],
      };
      setClusterAssignment(newClusterAssignment);
    }
  }, [clusterAssignments]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          Chart for{" "}
          <span className="capitalize">{!quizTitle ? "" : quizTitle}</span>
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex h-[780px] w-auto flex-col items-center justify-center space-y-2 rounded-md border p-4">
          <div className="flex h-1/2 w-full items-center justify-center">
            <Bar data={userData} options={barOptions} />
          </div>
          <div className="mt-12 flex h-1/2 w-1/2 items-center justify-center">
            {clusterAssignments && (
              <Doughnut data={clusterAssignment} options={options} />
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Chart;
