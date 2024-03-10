import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";

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
    <>
      <Card className="w-[375px] h-[180]">
        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg">
            Subjects Handled by {user.name}
          </CardTitle>
          <CardDescription>shows the subjects you handled!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Subjects Handled: </p>
          {data.map((subject: any, index) => (
            <p key={index}>{subject}</p>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Subjects_Handled_Card;
