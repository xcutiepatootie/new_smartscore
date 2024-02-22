"use client";
import { useToast } from "@/components/ui/use-toast";
import { updateQuiz } from "@/lib/server_actions/actions";
import { QuizFields, QuizSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { fromZodError } from "zod-validation-error";
import Section_Popover from "../AddQuiz/Section_Popover/Section_Popover";
import { DevTool } from "@hookform/devtools";

export const Update_Quiz = ({
  selectedQuiz,
  studentSection,
}: {
  selectedQuiz: QuizFields;
  studentSection: any;
}) => {
  const { questions } = selectedQuiz;

  console.log(selectedQuiz.questions[0].id);

  const questionIds = {
    questions: selectedQuiz.questions,
  };

  console.log(questionIds);

  console.log(questions);
  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading },
  } = useForm<QuizFields>({
    defaultValues: {
      quizName: selectedQuiz.quizName,
      numberOfItems: selectedQuiz.numberOfItems,
      subject: selectedQuiz.subject,
      sectionAssigned: selectedQuiz.sectionAssigned,
      questions: questions.map((question) => ({
        questionText: question.questionText,
        correctAnswer: question.correctAnswer,
        options: [...question.options],
      })),
    },
    resolver: zodResolver(QuizSchema),
  });

  const watchLength = watch("numberOfItems");

  const onSubmit: SubmitHandler<QuizFields> = async (data) => {
    console.log("heloo");
    // Handle form submission logic here
    console.log(data);
    const updateQuizData = await updateQuiz(
      data,
      selectedQuiz.id as string,
      questionIds as unknown as []
    );

    if (updateQuizData) {
      toast({
        className: "bg-green-600 text-neutral-100",
        title: "SmartScore",
        description: "Successfully Updated a Quiz.",
      });
    }

    const res = QuizSchema.safeParse(data);
    if (!res.success) {
      console.log(fromZodError(res.error));
    }
    console.log(res);
  };
  return (
    <div className="container w-screen h-[80vh] mx-auto mt-4 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
      <h1 className="pb-4">Update Quiz: </h1>
      <div className="border-t-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap py-4 border-b-2">
            <div>
              <label className="px-2">Quiz Name:</label>
              <input
                {...register("quizName", { required: true })}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                type="text"
                id="quizName"
              />
            </div>
            <div>
              <label className="px-2" htmlFor="numberOfItems">
                Number of Items:
              </label>
              <input
                {...register("numberOfItems", {
                  valueAsNumber: true,
                })}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                type="number"
                id="numberOfItems"
              />
            </div>
            <div>
              {" "}
              {/* New div for subject */}
              <label className="px-2" htmlFor="subject">
                Subject:
              </label>
              <input
                {...register("subject", { required: true })}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                type="text"
                id="subject"
              />
            </div>
            <div>
              <label className="px-2" htmlFor="subject">
                Sections:
              </label>
              {/* <input
                {...register("subject", { required: true })}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                type="text"
                id="subject"
              /> */}
              <Section_Popover
                control={control}
                studentSection={studentSection}
                defaultValue={selectedQuiz.sectionAssigned}
              />
            </div>
          </div>
          {Array.from({ length: watchLength }, (_, index) => (
            <div className="m-2" key={index}>
              <div>
                <div className="pb-2">
                  <label className="px-2">Question {index + 1}:</label>
                  <input
                    {...register(`questions.${index}.questionText`, {
                      required: true,
                    })}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-3/4"
                    type="text"
                  />
                </div>
              </div>

              <div className="pb-2">
                <label className="px-2">Correct Answer:</label>
                <input
                  {...register(`questions.${index}.correctAnswer`, {
                    required: true,
                  })}
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  type="text"
                />
              </div>
              <div className="flex gap-4 pb-6 border-b-2">
                <label className="px-2">Answers:</label>
                <div>
                  <label>a.</label>
                  <input
                    {...register(`questions.${index}.options.0`, {
                      required: true,
                    })}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div className="">
                  <label>b.</label>
                  <input
                    {...register(`questions.${index}.options.1`, {
                      required: true,
                    })}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div>
                  <label>c.</label>
                  <input
                    {...register(`questions.${index}.options.2`, {
                      required: true,
                    })}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div>
                  <label>d.</label>
                  <input
                    {...register(`questions.${index}.options.3`, {
                      required: true,
                    })}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <button
              className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </div>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
          {/*    <DevTool control={control} /> */}
        </form>
      </div>
    </div>
  );
};
