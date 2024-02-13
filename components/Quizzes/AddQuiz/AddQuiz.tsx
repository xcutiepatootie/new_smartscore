import { QuizFields, QuizSchema } from "@/types/types";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fromZodError } from 'zod-validation-error';
import { useToast } from '../../ui/use-toast';
import { createQuiz } from "@/lib/server_actions/actions";
import { Session } from "next-auth";



const AddQuiz = ({ sessionUser }: any) => {
    const { toast } = useToast();


    const { control, register, handleSubmit, watch, setError, formState: { errors, isLoading } } = useForm<QuizFields>({

        resolver: zodResolver(QuizSchema)
    });

    const watchLength = watch("numberOfItems");


    const onSubmit: SubmitHandler<QuizFields> = async (data) => {
        console.log("heloo")
        // Handle form submission logic here
        console.log(data);
        const createQuizData = await createQuiz(data);

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
                            <label className="px-2" >
                                Quiz Name:
                            </label>
                            <input
                                {...register('quizName', { required: true })}
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
                                {...register('numberOfItems', {
                                    valueAsNumber: true
                                })}
                                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                type="number"
                                id="numberOfItems"


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

                            />
                        </div>
                    </div>
                    {Array.from({ length: watchLength }, (_, index) => (
                        <div className="m-2" key={index}>
                            <div>
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
                            <div className="flex gap-4 pb-6 border-b-2">
                                <label className="px-2">Answers:</label>
                                <div>
                                    <label>a.</label>
                                    <input
                                        {...register(`questions.${index}.options.0`, { required: true })}
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"


                                    />
                                </div>
                                <div className="">
                                    <label>b.</label>
                                    <input
                                        {...register(`questions.${index}.options.1`, { required: true })}
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"


                                    />
                                </div>
                                <div>
                                    <label>c.</label>
                                    <input
                                        {...register(`questions.${index}.options.2`, { required: true })}
                                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        type="text"


                                    />
                                </div>
                                <div>
                                    <label>d.</label>
                                    <input
                                        {...register(`questions.${index}.options.3`, { required: true })}
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
                    {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
                </form>
                <DevTool control={control} />
            </div >
        </div >
    );
};

export default AddQuiz;
