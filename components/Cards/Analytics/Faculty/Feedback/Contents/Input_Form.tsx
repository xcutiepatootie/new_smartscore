import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clusterType, feedbackSchema, feedbackSchemaType } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Input_Form = ({ clusterData }: { clusterData: clusterType }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading, isDirty },
  } = useForm<feedbackSchemaType>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit: SubmitHandler<feedbackSchemaType> = async (data) => {
    console.log(data.feedbacks);
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
      {/*  <DevTool control={control} /> */}
    </>
  );
};

export default Input_Form;
