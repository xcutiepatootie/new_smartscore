import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { MdSubject } from "react-icons/md";

const Subjects_Handled_Card = async ({ userSession }: any) => {
  const user = userSession;
  let user_section: any = null;
  if (user.role === "student") {
    const { section } = userSession?.userSection;
    user_section = section;
  }

  async function getData() {
    const subjectsHandledByUser = await prisma.quiz.findMany({
      where: { facultyId: user.id },
      select: {
        subject: true,
      },
    });

    const distinctSubjects = new Set();

    subjectsHandledByUser.forEach((item) => distinctSubjects.add(item.subject));

    const distinctSubjectsArray = Array.from(distinctSubjects);

    console.log(distinctSubjectsArray);
    return distinctSubjectsArray;
  }
  const data = await getData();
  console.log(data);

  return (
    <Card className="h-[180] w-[375px] max-sm:w-[85%]">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">
          <div className="flex w-full flex-row justify-between">
            Subjects Handled by {user.name}
            <span className="">
              <MdSubject className="text-4xl text-emerald-400" />
            </span>
          </div>
        </CardTitle>
        <div className="mx-1 border-b border-amber-500 pb-2 drop-shadow-2xl" />
      </CardHeader>
      <CardContent>
        {data.map((subject: any, index) => (
          <p key={index}>{subject}</p>
        ))}
      </CardContent>
    </Card>
  );
};

export default Subjects_Handled_Card;
