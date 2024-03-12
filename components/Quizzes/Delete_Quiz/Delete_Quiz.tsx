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
import { useToast } from "@/components/ui/use-toast";
import { deleteQuiz } from "@/lib/server_actions/actions";

const Delete_Quiz = ({ quizId }: any) => {
  const { toast } = useToast();
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-rose-400 text-black hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition-all duration-200 ml-4">
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
              className="bg-pink-400"
              onClick={async () => {
                const delQuiz = await deleteQuiz(quizId);
                if(delQuiz){
                    toast({
                        className: "bg-green-600 text-neutral-100",
                        title: "SmartScore",
                        description: "Successfully Deleted a Quiz.",
                      });
                }
              }}
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
