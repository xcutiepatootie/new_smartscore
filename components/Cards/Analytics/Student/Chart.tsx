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
  maintainASpectRatio: false,
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
  maintainASpectRatio: false,
  plugins: {
    legend: {
      /* position: "right" as const, */
      display: false,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

/* const top5StudentIds = Array.from(
  studentRecords
    .sort((a, b) => b.averageScore - a.averageScore) // Sort in descending order of averageScore
    .reduce((accumulator, currentRecord) => {
      if (!accumulator.has(currentRecord.averageScore)) {
        accumulator.set(currentRecord.averageScore, {
          studentId: currentRecord.studentId,
          totalScore: currentRecord.totalScore,
          totalTime: currentRecord.totalTime,
          totalOutOfFocus: currentRecord.totalOutOfFocus,
          totalAnswersClicked: currentRecord.totalAnswersClicked,
          totalRetriesLeft: currentRecord.totalRetriesLeft,
          count: currentRecord.count,
          averageAnswersClicked: currentRecord.averageAnswersClicked,
          averageOutOfFocus: currentRecord.averageOutOfFocus,
          averageRetriesLeft: currentRecord.averageRetriesLeft,
          averageScore: currentRecord.averageScore,
          averageTime: currentRecord.averageTime,
        });
      }
      return accumulator;
    }, new Map())
    .values(),
).slice(0, 5); // Get the first 5 unique records */

export const ranking = ["1st", "2nd", "3rd", "4th", "5th", "You"];

const generateInitialState = (datasetLabel: string) => ({
  labels: ranking.map((data) => data),
  datasets: [
    {
      label: datasetLabel,
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

const Chart = ({
  quizTitle,
  clusterAssignments,
  barValues,
}: {
  quizTitle: string;
  clusterAssignments: [{ studentId: string; cluster: number }];
  barValues: any;
}) => {
  console.log(barValues);

  // For Bar Charts
  // For score
  const [barChart_score, setBarChart_score] = useState({
    ...generateInitialState("Score: "),
    options: {
      ...barOptions,
      plugins: {
        ...barOptions.plugins,
        title: { ...barOptions.plugins.title, text: "Results by Score" },
      },
    },
  });

  // For Time

  const [barChart_Time, setBarChart_Time] = useState({
    ...generateInitialState("Time: "),
    options: {
      ...barOptions,
      plugins: {
        ...barOptions.plugins,
        title: { ...barOptions.plugins.title, text: "Results by Time" },
      },
    },
  });
  // For answersClicked
  const [barChart_answersClicked, setBarChart_answersClicked] = useState({
    ...generateInitialState("Answers Clicked: "),
    options: {
      ...barOptions,
      plugins: {
        ...barOptions.plugins,
        title: {
          ...barOptions.plugins.title,
          text: "Results by Answers Clicked",
        },
      },
    },
  });

  // For outoffocus
  const [barChart_outOfFocus, setBarChart_outOfFocus] = useState({
    ...generateInitialState("Out of Focus: "),
    options: {
      ...barOptions,
      plugins: {
        ...barOptions.plugins,
        title: { ...barOptions.plugins.title, text: "Results by Out of Focus" },
      },
    },
  });

  // For retriesLeft
  const [barChart_retriesLeft, setBarChart_retriesLeft] = useState({
    ...generateInitialState("Retries Left: "),
    options: {
      ...barOptions,
      plugins: {
        ...barOptions.plugins,
        title: { ...barOptions.plugins.title, text: "Results by Retries Left" },
      },
    },
  });
  // For Donut Chart
  const [clusterCounts, setClusterCounts] = useState<number[]>([]);
  const [uniqueLabels, setUniqueLabels] = useState<string[]>([]);
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
    if (barValues) {
      // For Score
      console.log(barValues.userValue);
      const newDataset_score = {
        ...barChart_score.datasets[0],
        data: [
          ...barValues.scores.map(
            (data: { averageScore: any }) => data.averageScore,
          ),
          barValues.userValue[0] ? barValues.userValue[0].averageScore : "",
        ],
      };
      const newValueAssignment_score: any = {
        ...barChart_score,
        datasets: [newDataset_score],
      };
      setBarChart_score(newValueAssignment_score);

      // For Time
      const newDataset_time = {
        ...barChart_Time.datasets[0],
        data: [
          ...barValues.time.map(
            (data: { averageTime: any }) => data.averageTime,
          ),
          barValues.userValue[0] ? barValues.userValue[0].averageTime : "",
        ],
      };
      const newValueAssignment_time: any = {
        ...barChart_Time,
        datasets: [newDataset_time],
      };
      setBarChart_Time(newValueAssignment_time);

      // For answers clicked
      const newDataset_answersClicked = {
        ...barChart_answersClicked.datasets[0],
        data: [
          ...barValues.answersclicked.map(
            (data: { averageAnswersClicked: any }) =>
              data.averageAnswersClicked,
          ),
          barValues.userValue[0]
            ? barValues.userValue[0].averageAnswersClicked
            : "",
        ],
      };
      const newValueAssignment_answersClicked: any = {
        ...barChart_answersClicked,
        datasets: [newDataset_answersClicked],
      };
      setBarChart_answersClicked(newValueAssignment_answersClicked);

      // For out of focus
      const newDataset_outoffocus = {
        ...barChart_outOfFocus.datasets[0],
        data: [
          ...barValues.outoffocus.map(
            (data: { averageOutOfFocus: any }) => data.averageOutOfFocus,
          ),
          barValues.userValue[0]
            ? barValues.userValue[0].averageOutOfFocus
            : "",
        ],
      };
      const newValueAssignment_outoffocus: any = {
        ...barChart_outOfFocus,
        datasets: [newDataset_outoffocus],
      };
      setBarChart_outOfFocus(newValueAssignment_outoffocus);

      // For retries left
      const newDataset_retriesleft = {
        ...barChart_retriesLeft.datasets[0],
        data: [
          ...barValues.retriesleft.map(
            (data: { averageRetriesLeft: any }) => data.averageRetriesLeft,
          ),
          barValues.userValue[0]
            ? barValues.userValue[0].averageRetriesLeft
            : "",
        ],
      };
      const newValueAssignment_retriesleft: any = {
        ...barChart_retriesLeft,
        datasets: [newDataset_retriesleft],
      };
      setBarChart_retriesLeft(newValueAssignment_retriesleft);
    }
  }, [barValues]);

  // For Donut

  useEffect(() => {
    if (clusterAssignments) {
      const uniqueLabels = Array.from(
        new Set(clusterAssignments.map((data) => data.cluster)),
      )
        .sort()
        .map((label) => "Cluster " + (label + 1));
      console.log("uniqueLabels: ", uniqueLabels);

      setUniqueLabels(uniqueLabels);

      const counts: number[] = Array(uniqueLabels.length).fill(0);
      clusterAssignments.forEach((data) => {
        counts[data.cluster] += 1;
      });
      console.log("Counts: ", counts);
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
        <ScrollArea className=" h-[780px] w-full  items-center justify-center space-y-2 rounded-md border p-4">
          <div className="h-[1%] w-full">
            <div>
              <Bar data={barChart_score} options={barChart_score.options} />
            </div>
          </div>
          <Bar data={barChart_Time} options={barChart_Time.options} />
          <Bar
            data={barChart_answersClicked}
            options={barChart_answersClicked.options}
          />
          <Bar
            data={barChart_outOfFocus}
            options={barChart_outOfFocus.options}
          />
          <Bar
            data={barChart_retriesLeft}
            options={barChart_retriesLeft.options}
          />
          <div className="mt-12 flex h-1/2 w-full items-center justify-center p-4">
            {clusterAssignments && (
              <div>
                <Doughnut data={clusterAssignment} options={options} />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Chart;
