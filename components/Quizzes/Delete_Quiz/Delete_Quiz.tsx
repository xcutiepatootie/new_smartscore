import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteQuiz } from "@/lib/server_actions/actions";

const Delete_Quiz = ({ quizId }: any) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-400 text-black hover:bg-violet-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ml-4">
          Delete Quiz
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to Delete this Quiz?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove the quiz from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400"
              onClick={async () => await deleteQuiz(quizId)}
            >
              Delete Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete_Quiz;
