import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { setFeedback } from "@/lib/server_actions/actions";
import { clusterType, feedbackSchema, feedbackSchemaType } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FeedbackItem } from "./Feedback_Input";
import { Prisma } from "@prisma/client";

const Input_Form = ({
  clusterData,
  quizName,
  quizId,
  prevfeedbacks,
  clusterAssignments,
}: {
  clusterData: clusterType;
  quizName: string;
  quizId: string;
  prevfeedbacks: string[];
  clusterAssignments: any;
}) => {
  const { toast } = useToast();
  const [defaultValuesSet, setDefaultValuesSet] = useState(false);

  console.log(prevfeedbacks);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    reset,
    formState: { errors, isLoading, isDirty },
  } = useForm<feedbackSchemaType>({
    defaultValues: { postedFeedbacks: prevfeedbacks || [] },
    resolver: zodResolver(feedbackSchema),
  });
  console.log(prevfeedbacks.length);
  useEffect(() => {
    if (prevfeedbacks.length > 0) {
      // Reset the form if prevfeedbacks is not null
      reset({ postedFeedbacks: prevfeedbacks || [] });
    } else {
      const emptyArray = Array.from({ length: clusterData.length }, () => "");

      console.log(emptyArray);
      reset({ postedFeedbacks: emptyArray });
    }
  }, [prevfeedbacks, reset, clusterData]);
  const onSubmit: SubmitHandler<feedbackSchemaType> = async (data) => {
    console.log(quizName);
    console.log(data);

    const updateData = await setFeedback(
      quizId,
      quizName,
      data,
      clusterAssignments,
    );
    console.log(updateData);
    if (updateData === "Error") {
      toast({
        className: "bg-red-600 text-neutral-100",
        title: "SmartScore",
        description: "Error posting a Feedback.",
      });
    } else {
      toast({
        className: "bg-green-600 text-neutral-100",
        title: "SmartScore",
        description: "Successfully posted a Feedback.",
      });
    }
  };

  console.log(/* prevfeedbacks */);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-4">
        <div className="space-y-4">
          {clusterData.map((cluster, index) => (
            <div key={cluster.clusterNumber}>
              <Label className="text-xl italic ">
                Cluster {cluster.clusterNumber}
              </Label>
              <Input
                {...register(`postedFeedbacks.${index}`, {})}
                placeholder="Enter Feedback Here"
              />
            </div>
          ))}
        </div>

        <Button type="submit" variant="outline" className="mt-4 bg-green-300">
          Submit
        </Button>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default Input_Form;
