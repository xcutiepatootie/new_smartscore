import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { setFeedback } from "@/lib/server_actions/actions";
import { clusterType, feedbackSchema, feedbackSchemaType } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Input_Form = ({
  clusterData,
  quizName,
  quizId,
}: {
  clusterData: clusterType;
  quizName: string;
  quizId: string;
}) => {
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading, isDirty },
  } = useForm<feedbackSchemaType>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit: SubmitHandler<feedbackSchemaType> = async (data) => {
    console.log(quizName);
    console.log(data.feedbacks);

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
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="space-y-4">
          {clusterData.map((cluster, index) => (
            <div key={cluster.clusterNumber}>
              <Label>Cluster {cluster.clusterNumber}</Label>
              <Input
                {...register(`feedbacks.${index}.feedback`)}
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
