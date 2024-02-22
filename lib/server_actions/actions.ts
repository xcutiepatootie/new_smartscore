"use server";
import {
  QuizFields,
  SignUpFormFields,
  Student_Quiz_Result,
} from "@/types/types";
import { Faculty, Question, Quiz, Student, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { config } from "../auth";
import prisma from "../prisma";
import { redirect } from "next/navigation";

async function getUserSession() {
  const getSession = await getServerSession(config);
  return getSession;
}

export async function getSections() {
  const getSection = await prisma.student.findMany({
    distinct: ["section"],
    select: {
      section: true,
    },
  });

  console.log(getSection);

  return getSection;
}

// Server Action for Create || Auth User
export async function createUser(userData: SignUpFormFields) {
  console.log(userData);
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const [res_CreateUser, res_Faculty_Student]: [User, Student | Faculty] =
    await prisma.$transaction([
      prisma.user.create({
        data: {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
        },
      }),

      userData.role === "student"
        ? prisma.student.create({
            data: {
              name: userData.name,
              username: userData.username,
              email: userData.email,
              section: userData.classSection,
              user: { connect: { email: userData.email } },
            },
            include: { user: true },
          })
        : prisma.faculty.create({
            data: {
              name: userData.name,
              username: userData.username,
              email: userData.email,
              user: { connect: { email: userData.email } },
            },
            include: { user: true },
          }),
    ]);

  console.log(res_CreateUser, res_Faculty_Student);
  return res_CreateUser;
}

// Generate a random code
function generateRandomCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 62); // 26 letters (uppercase and lowercase) + 10 digits
    if (randomIndex < 26) {
      // Uppercase letter
      code += String.fromCharCode(65 + randomIndex);
    } else if (randomIndex < 52) {
      // Lowercase letter
      code += String.fromCharCode(97 + randomIndex - 26);
    } else {
      // Digit
      code += String.fromCharCode(48 + randomIndex - 52);
    }
  }
  return code;
}

// Create Quiz
export async function createQuiz(createQuizData: QuizFields) {
  const getSession = await getServerSession(config);
  console.log(createQuizData, getSession);

  let transaction;
  try {
    transaction = await prisma.$transaction(async (prisma) => {
      const createQuizInput = {
        facultyName: getSession?.user.name,
        quizName: createQuizData.quizName,
        numberOfItems: createQuizData.numberOfItems,
        subject: createQuizData.subject,
        questions: {
          // Associate questions with the quiz
          create: createQuizData.questions.map((question) => ({
            questionText: question.questionText,
            options: question.options,
            correctAnswer: question.correctAnswer,
          })),
        },
      };

      const createQuizResult = await prisma.quiz.create({
        data: {
          facultyName: getSession?.user.name,
          quizName: createQuizData.quizName,
          numberOfItems: createQuizData.numberOfItems,
          quizCode: generateRandomCode(),
          subject: createQuizData.subject,
          sectionAssigned: createQuizData.selectedSections,
          questions: {
            // Associate questions with the quiz
            create: createQuizData.questions.map((question) => ({
              questionText: question.questionText,
              options: question.options,
              correctAnswer: question.correctAnswer,
            })),
          },
          Faculty: { connect: { facultyId: getSession?.user.id } },
        },
        include: { questions: true },
      });

      console.log(createQuizResult, createQuizInput);
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/quizzes");
      return { createQuiz: createQuizResult };
    });
    console.log(transaction);
  } catch (error) {
    console.log(error);
  }
  redirect("/dashboard/quizzes");
  /*   const [addQuestionToDB, _createQuiz, addQuizToFaculty]: [Question: Quiz, Faculty] = await prisma.$transaction([
  
          
           prisma.question.create({
  
          }),
          prisma.quiz.create({
              data: {
                  quizName: createQuizData.quizName,
                  numberOfItems: createQuizData.numberOfItems,
  
              }
          }),
          prisma.faculty.upsert({
  
          }) 
      ]) */
}

// Update Quiz
export async function updateQuiz(
  updateQuizData: QuizFields,
  quizIdLocal: string,
  questionsLocal: any
) {
  const session = await getUserSession();

  console.log(questionsLocal);

  const updatedQuizResult = await prisma.quiz.update({
    where: { id: quizIdLocal },
    data: {
      facultyName: session?.user.name, // Update faculty name if needed
      quizName: updateQuizData.quizName, // Update quiz name if needed
      numberOfItems: updateQuizData.numberOfItems, // Update number of items if needed
      subject: updateQuizData.subject, // Update subject if needed
      questions: {
        // Associate updated questions with the quiz
        upsert: questionsLocal.questions.map((question: any) => ({
          where: { id: question.id }, // Provide the ID of the question you want to update
          update: {
            questionText: question.questionText, // Update question text if needed
            options: question.options, // Update options if needed
            correctAnswer: question.correctAnswer, // Update correct answer if needed
          },
          create: {
            questionText: question.questionText, // Create a new question if not found
            options: question.options,
            correctAnswer: question.correctAnswer,
          },
        })),
      },
      Faculty: { connect: { facultyId: session?.user.id } }, // Connect faculty if needed
    },
    include: { questions: true }, // Include questions in the updated quiz result
  });

  // Associate questions with the quiz
  /*   create: updateQuizData.questions.map((question) => ({
          questionText: question.questionText,
          options: question.options,
        correctAnswer: question.correctAnswer,
        })) */
}

// Delete Quiz
export async function deleteQuiz(quizIdLocal: string) {
  const [delQuestions, delQuiz] = await prisma.$transaction([
    prisma.question.deleteMany({
      where: { quizId: quizIdLocal },
    }),

    prisma.quiz.delete({
      where: { id: quizIdLocal },
      include: { questions: true },
    }),
  ]);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quizzes");
  console.log(delQuiz, delQuestions);
  return { delQuiz, delQuestions };
}

// Get Selected Quiz by quizId
export async function getSelectedQuiz(quizID: string) {
  const selectedQuiz = await prisma.quiz.findUnique({
    where: { id: quizID },
    include: {
      questions: true,
    },
  });
  console.log(selectedQuiz);
  return selectedQuiz;
}

// Submit Student Answers and Records
export async function submitStudentAnswers(
  quizId: string,
  studentResult: Student_Quiz_Result
) {
  const userSession = await getUserSession();
  const currentTimestamp = Date.now();
  const currentDate = new Date(currentTimestamp);
  const dateString = currentDate.toISOString();

  /* const saveToStudentTakenQuiz = await prisma.quizTaken.create({
    data: {
      quiz: { connect: { id: quizId } },
      student: { connect: { studentId: userSession?.user.id } },
      dateTaken: dateString,
      retriesLeft: 5,
      
    },
    include: { quiz: true, student: true },
  });
 */

  const existingQuiz = await prisma.quizTaken.findFirst({
    where: {
      AND: [{ quizId: quizId }, { studentId: userSession?.user.id as string }],
    },
  });

  console.log("Existing", existingQuiz);

  if (existingQuiz) {
    const updateStudentTakenQuiz = await prisma.quizTaken.update({
      where: {
        id: existingQuiz?.id,
      },
      data: {
        isPerfect: studentResult.isPerfect,
        retriesLeft: {
          decrement: 1,
        },
      },
    });

    if (existingQuiz.retriesLeft <= 1 || studentResult.isPerfect) {
      console.log("pasok HAHAHA");
      const updateStudentDone = await prisma.quizTaken.update({
        where: {
          id: existingQuiz?.id,
        },
        data: {
          isDone: true,
        },
      });
    }

    const saveResult = await prisma.quiz_Result.create({
      data: {
        score: studentResult.studentScore,
        time: studentResult.finalTime,
        timeStr: studentResult.finalTime_str,
        out_of_focus: studentResult.focusCount,
        answers_clicked: studentResult.numberOfAnswerClicks,
        dateTaken: dateString,
        quizTaken: { connect: { id: updateStudentTakenQuiz.id } },
        student: { connect: { studentId: userSession?.user.id as string } },
      },
      include: { quizTaken: true },
    });

    console.log(updateStudentTakenQuiz, saveResult);
    revalidatePath("/dashboard/quizzes");
    redirect("/dashboard/quizzes");
  } else {
    const saveToStudentTakenQuiz = await prisma.quizTaken.create({
      data: {
        quiz: { connect: { id: quizId } },
        student: { connect: { studentId: userSession?.user.id } },
        dateTaken: dateString,
        isPerfect: studentResult.isPerfect,
        retriesLeft: 5,
      },
      include: {
        quiz: true,
        student: true,
      },
    });

    const saveResult = await prisma.quiz_Result.create({
      data: {
        score: studentResult.studentScore,
        time: studentResult.finalTime,
        timeStr: studentResult.finalTime_str,
        out_of_focus: studentResult.focusCount,
        answers_clicked: studentResult.numberOfAnswerClicks,
        dateTaken: dateString,
        quizTaken: { connect: { id: saveToStudentTakenQuiz.id } },
        student: { connect: { studentId: userSession?.user.id as string } },
      },
      include: { quizTaken: true },
    });

    console.log(saveToStudentTakenQuiz, saveResult);
    revalidatePath("/dashboard/quizzes");
    redirect("/dashboard/quizzes");
  }
}

export async function takeQuizUseCode(quizCodeLocal: string) {
  const userSession = await getUserSession();
  const { section }: any = userSession?.user.userSection;

  const findQuiz = await prisma.quiz.findUnique({
    where: { quizCode: quizCodeLocal },
  });

  if (!findQuiz) {
    return "No Quiz Found";
  }

  const checkQuizIsAssigned = findQuiz.sectionAssigned.includes(section);

  console.log(checkQuizIsAssigned);
  if(checkQuizIsAssigned === false){
    return "Quiz is not assigned in your section"
  }

  const checkQuizisDone = await prisma.quizTaken.findFirst({
    where: {
      AND: [
        { quizId: findQuiz?.id },
        { isDone: true },
        { studentId: userSession?.user.id },
      ],
    },
  });

  console.log(checkQuizisDone);

  if (checkQuizisDone) {
    return "Quiz is already done";
  }

  console.log(findQuiz);
  redirect(`/dashboard/quizzes/take-quiz?quizId=${findQuiz?.id}`);
}
