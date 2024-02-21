import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { takeQuizUseCode } from "@/lib/server_actions/actions";
import { quizCodeField, quizCodeSchema } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const TakeQuiz_UseCode = () => {
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    setError,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<quizCodeField>({ resolver: zodResolver(quizCodeSchema) });

  const onSubmit: SubmitHandler<quizCodeField> = async (data) => {
    console.log(data);
    const find = await takeQuizUseCode(data.quizCode);
    if (find === "No Quiz Found") {
      setError("quizCode", { type: "custom", message: "No Quiz Found" });
    }
    if (find === "Quiz is already done") {
      setError("quizCode", { type: "custom", message: "Quiz is already done" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200"
          variant="outline"
        >
          Take Quiz Using Quiz Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Enter Quiz Code</DialogTitle>
            <DialogDescription>
              Enter the Quiz Code provided by the faculty if the quiz is cannot
              be found manually in the list.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Quiz Code
              </Label>
              <Input
                {...register("quizCode", { required: true })}
                id="quizCode"
                className="col-span-3"
                placeholder="Enter Quiz Code"
              />
            </div>
          </div>

          {errors.quizCode && (
            <div className="text-red-500 text-xs">
              {errors.quizCode.type === "custom" ? (
                <>
                  <br />
                  {errors.quizCode.message}
                </>
              ) : (
                " The Quiz Code always contains 6 alphanumeric characters and is case-sensitive. Ask the faculty for the Quiz Code."
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TakeQuiz_UseCode;
