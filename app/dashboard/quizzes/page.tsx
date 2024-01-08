"use client"
import AddQuiz from "@/components/AddQuiz/AddQuiz";
import ListQuiz from "@/components/ListQuiz/ListQuiz";
import { useSession } from "next-auth/react";
import { useState } from "react";


const Quizzes = () => {

    const [showViewQuiz, setShowViewQuiz] = useState(true);
    const { data: session, status } = useSession();

    const handleToggleView = () => {
        setShowViewQuiz(!showViewQuiz);
    };



    return (
        <>
            <div className="flex">

                <div className=''>

                    <div className="flex flex-row">

                        <div>
                            <div className="flex flex-row">
                                <div className="px-4">
                                    <button
                                        className={`bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ${showViewQuiz ? 'bg-opacity-100' : 'bg-opacity-50'
                                            }`}
                                        onClick={handleToggleView}
                                        disabled={showViewQuiz}
                                    >
                                        View Quiz
                                    </button>
                                </div>

                                {session?.user.role === 'faculty' && (

                                    <div className="px-4">
                                        <button
                                            className={`bg-lsblue text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ${!showViewQuiz ? 'bg-opacity-100' : 'bg-opacity-50'
                                                }`}
                                            onClick={handleToggleView}
                                            disabled={!showViewQuiz}
                                        >
                                            Create Quiz
                                        </button>
                                    </div>
                                )}

                            </div>

                            <div className="container w-screen h-[80vh] mx-auto mt-4 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
                                {showViewQuiz ? (
                                    <ListQuiz />
                                ) : (
                                    <AddQuiz />
                                )}
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Quizzes