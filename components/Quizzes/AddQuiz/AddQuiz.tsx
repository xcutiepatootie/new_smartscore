import { QuizFields, QuizSchema } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { fromZodError } from "zod-validation-error";
import { useToast } from "../../ui/use-toast";
import { createQuiz } from "@/lib/server_actions/actions";
import { Session } from "next-auth";
import Section_Popover from "./Section_Popover/Section_Popover";

const AddQuiz = () => {
  const { toast } = useToast();

  

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isLoading },
  } = useForm<QuizFields>({
    resolver: zodResolver(QuizSchema),
  });

  const watchLength = watch("numberOfItems");

  const onSubmit: SubmitHandler<QuizFields> = async (data) => {
    let isValid = true;
    console.log("heloo");
    // Handle form submission logic here
    console.log(data);
    const index = data.questions.findIndex(
      (question, index) =>
        question.correctAnswer !== `options.${index}.0` &&
        question.correctAnswer !== `options.${index}.1` &&
        question.correctAnswer !== `options.${index}.2` &&
        question.correctAnswer !== `options.${index}.3`,
    );

    data.questions.forEach((question, index) => {
      // Ensure correct answer is within options
      if (
        !data.questions[index].options.includes(
          data.questions[index].correctAnswer,
        )
      ) {
        isValid = false;
        // Set error for the incorrect question
        setError(`questions.${index}.correctAnswer`, {
          type: "manual",
          message: "Correct answer must be one of the options.",
        });

        toast({
          className: "bg-red-600 text-neutral-100",
          title: "SmartScore",
          description: "Correct answer is not found in the choices.",
        });
      }
    });

    if (isValid) {
      // All correct answers are within options
      // Proceed with form submission
      console.log("Form data:", data);
      const createQuizData = await createQuiz(data);
      if (createQuizData) {
        toast({
          className: "bg-green-600 text-neutral-100",
          title: "SmartScore",
          description: "Successfully Created a Quiz.",
        });
      }
    } else {
      // Correct answer not found within options
      console.log("Correct answer is not within options");
      // You can also display an error message or handle it as needed
    }

    const res = QuizSchema.safeParse(data);
    if (!res.success) {
      console.log(fromZodError(res.error));
    }
    console.log(res);
  };

  return (
    <div>
      <h1 className="pb-4">Create Quiz</h1>
      <div className="border-t-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap border-b-2 py-4">
            <div>
              <label className="px-2">Quiz Name:</label>
              <input
                {...register("quizName", { required: true })}
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              <Section_Popover control={control} />
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
                    className="w-3/4 rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                  className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  type="text"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 border-b-2 pb-6">
                <label className="px-2">Answers:</label>
                <div>
                  <label>a.</label>
                  <input
                    {...register(`questions.${index}.options.0`, {
                      required: true,
                    })}
                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div className="">
                  <label>b.</label>
                  <input
                    {...register(`questions.${index}.options.1`, {
                      required: true,
                    })}
                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div>
                  <label>c.</label>
                  <input
                    {...register(`questions.${index}.options.2`, {
                      required: true,
                    })}
                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
                <div>
                  <label>d.</label>
                  <input
                    {...register(`questions.${index}.options.3`, {
                      required: true,
                    })}
                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    type="text"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <button
              className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </div>

          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
        {/*  <DevTool control={control} /> */}
      </div>
    </div>
  );
};

export default AddQuiz;
