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
}: {
  clusterData: clusterType;
  quizName: string;
  quizId: string;
  prevfeedbacks: string[];
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

    const updateData = await setFeedback(quizId, quizName, data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="space-y-4">
          {clusterData.map((cluster, index) => (
            <div key={cluster.clusterNumber}>
              <Label>Cluster {cluster.clusterNumber}</Label>
              <Input
                {...register(`postedFeedbacks.${index}`, {})}
                placeholder="Enter Feedback Here"
              />
            </div>
          ))}
        </div>

        <Button type="submit" variant="outline" className="bg-green-300 mt-4">
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default Input_Form;
