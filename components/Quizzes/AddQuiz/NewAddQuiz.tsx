import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { useToast } from '../../ui/use-toast';
import { ChangeEvent, useState } from 'react';
import { DevTool } from "@hookform/devtools"





const QuizSchema = z.object({
    quizName: z.string(),
    numberOfItems: z.number().min(1).max(100),
    subject: z.string(),
    questions: z.array(z.object({
        questionText: z.string(),
        correctAnswer: z.string()
    })),
})

type QuizFields = z.infer<typeof QuizSchema>

const AddQuiz = () => {
    const { toast } = useToast();


    const { control, register, handleSubmit, watch, setError, formState: { errors, isLoading } } = useForm<QuizFields>({
        defaultValues: {
            questions: [{ questionText: "Test", correctAnswer: "test" }]
        },
        resolver: zodResolver(QuizSchema)
    })

    const watchLength = watch("numberOfItems")


    const onSubmit: SubmitHandler<QuizFields> = async (data) => {
        console.log("heloo")
        // Handle form submission logic here
        console.log(data);

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
                    <div className="flex flex-wrap py-4 border-b-2">
                        <div>
                            <label className="px-2" htmlFor="quizName">
                                Quiz Name:
                            </label>
                            <input
                                {...register('quizName', { required: true })}
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                type="text"
                                id="quizName"
                                name="quizName"

                            />
                        </div>
                        <div>
                            <label className="px-2" htmlFor="numberOfItems">
                                Number of Items:
                            </label>
                            <input
                                {...register('numberOfItems', {
                                    required: true,
                                    valueAsNumber: true
                                })}
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                type="number"
                                id="numberOfItems"
                                name="numberOfItems"


                            />
                        </div>
                        <div> {/* New div for subject */}
                            <label className="px-2" htmlFor="subject">
                                Subject:
                            </label>
                            <input
                                {...register('subject', { required: true })}
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                type="text"
                                id="subject"
                                name="subject"

                            />
                        </div>
                    </div>
                    {Array.from({ length: watchLength }, (_, index) => (
                        <>
                            <div className="m-2" key={index}>
                                <div className="pb-2">
                                    <label className="px-2">
                                        Question {index + 1}:
                                    </label>
                                    <input
                                        {...register(`questions.${index}.questionText`, { required: true })}
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-3/4"
                                        type="text"


                                    />
                                </div>
                            </div>

                            <div className="pb-2">
                                <label className="px-2" >
                                    Correct Answer:
                                </label>
                                <input
                                    {...register(`questions.${index}.correctAnswer`, { required: true })}
                                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    type="text"

                                />
                            </div>
                        </>
                    ))}

                  


                    <div className="py-4">
                        <button
                            className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
                </form>
                <DevTool control={control} />
            </div >
        </div >
    );
};

export default AddQuiz;
