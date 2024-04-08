"use server";
import {
  QuizFields,
  SignUpFormFields,
  Student_Quiz_Result,
  clusterType,
  feedbackSchemaType,
} from "@/types/types";
import { Faculty, Prisma, Question, Quiz, Student, User } from "@prisma/client";
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

export async function getSectionHandled() {
  const userSession = await getUserSession();
  const findSectionHandled = await prisma.quiz.findMany({
    where: {
      facultyId: userSession?.user.id,
    },
    distinct: ["sectionAssigned"],
    select: { sectionAssigned: true },
  });

  const uniqueSections: string[] = [];
  findSectionHandled.forEach((entry) => {
    entry.sectionAssigned.forEach((section) => {
      if (!uniqueSections.includes(section)) {
        uniqueSections.push(section);
      }
    });
  });
  return uniqueSections;
}

export async function updateInitialLogin() {
  const userSession = await getUserSession();

  if (userSession) {
    const updateValue = await prisma.user.update({
      where: {
        id: userSession.user.id,
      },
      data: {
        initialLogin: false,
      },
    });
  }
}

// Cross Origin APIS
export async function getStudentClusterAssignments(quizId: string) {
  const clusterAssignments = await fetch(
    `http://localhost:8080/api/assignments?quizId=${quizId}`,
    { cache: "force-cache" },
  );
  if (!clusterAssignments.ok) {
    /* console.log(clusterAssignments);
    throw new Error("Failed to fetch data"); */
    return "Not Enough Instances to cluster";
  }
  const fetchedClusterAssignments = await clusterAssignments.json();
  console.log(fetchedClusterAssignments);

  return fetchedClusterAssignments;
}

export async function getStudentRecords(quizId: string) {
  const studentRecords = await fetch(
    `http://localhost:8080/api/student_records?quizId=${quizId}`,
    { cache: "force-cache" },
  );
  if (!studentRecords.ok) {
    throw new Error("Failed to fetch data");
  }
  const fetchedStudentRecords = await studentRecords.json();
  console.log(fetchedStudentRecords);
  return fetchedStudentRecords;
}

export async function getClusterValues(quizId: string) {
  const clusterValues = await fetch(
    `http://localhost:8080/api/cluster/average-values?quizId=${quizId}`,
    { cache: "force-cache" },
  );
  if (!clusterValues.ok) {
    throw new Error("Failed to fetch data");
  }
  const fetchedClusterValues: clusterType = await clusterValues.json();
  console.log(fetchedClusterValues);

  return fetchedClusterValues;
}

export async function getClusterChart(
  quizId: string,
  xvalue: string,
  yvalue: string,
) {
  const clusterChart = await fetch(
    `http://localhost:8080/charts/plot64?quizId=${quizId}&xvalue=${xvalue}&yvalue=${yvalue}`,
    { cache: "force-cache" },
  );
  if (!clusterChart.ok) {
    throw new Error("Failed to fetch data");
  }

  const fetchClusterChart = await clusterChart.text();

  console.log(fetchClusterChart);
  return fetchClusterChart;
}

export async function getChartValues(quizId: string) {
  const userSession = await getUserSession();
  try {
    const studentRecords = await fetch(
      `http://localhost:8080/api/student_records_charts?quizId=${quizId}&studentId=${userSession?.user.id}`,
      { cache: "force-cache" },
    );
    console.log(studentRecords);
    if (!studentRecords.ok) {
    }
    const fetchedStudentRecords = await studentRecords.json();
    console.log(fetchedStudentRecords);
    return fetchedStudentRecords;
  } catch (error) {
    console.log(error);
    return "No Quiz Found";
  }
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

//--------------------- Faculty Actions
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

  /*  transaction = await prisma.$transaction(async (prisma) => {
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
      }; */

  const createQuizResult = await prisma.quiz.create({
    data: {
      facultyName: getSession?.user.name,
      quizName: createQuizData.quizName,
      numberOfItems: createQuizData.numberOfItems,
      quizCode: generateRandomCode(),
      subject: createQuizData.subject,
      sectionAssigned: createQuizData.sectionAssigned,
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

  console.log(createQuizResult);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quizzes");
  return createQuizResult;
}

export async function quizSection_Card() {
  const userSession = await getUserSession();

  const getAllQuizzes = await prisma.quiz.findMany({
    where: { facultyId: userSession?.user.id },
    select: { id: true, quizName: true, sectionAssigned: true },
  });

  console.log(getAllQuizzes);

  return getAllQuizzes;
}

// Get students for Quiz_Section Card
export async function student_sectionList(
  sectionLocal: string,
  quizId: string,
) {
  const getStudents = await prisma.student.findMany({
    where: { section: sectionLocal },
  });

  const getQuizTaken = await prisma.quizTaken.findMany({
    where: { quizId: quizId },
  });

  console.log(getStudents, getQuizTaken);
  // Iterate over each student
  const studentsWithStatus = getStudents.map((student) => {
    // Check if there is a corresponding entry in getQuizTaken for this student
    const quizTakenByStudent = getQuizTaken.find(
      (quiz) => quiz.studentId === student.studentId && quiz.isDone === true,
    );

    // If quizTakenByStudent is undefined, it means the student hasn't taken the quiz
    // Set the status accordingly
    const status = quizTakenByStudent ? "Done" : "Not Done";
    console.log(quizTakenByStudent);
    // Return the student object with the status added
    return { ...student, status };
  });

  console.log(studentsWithStatus);
  return studentsWithStatus;
}

// Get students for Analytics
/* export async function faculty_analytics() {
  const studentClusterAssignments: any = await getStudentClusterAssignments();
  console.log(typeof studentClusterAssignments);
  return studentClusterAssignments;
} */
// Get quizTaken for Analytics
export async function getQuizTaken(quizId: string) {
  const fetchQuizTakenById = await prisma.quizTaken.findMany({
    where: {
      quizId: quizId,
      isDone: true,
    },

    include: { student: true },
  });
  console.log(fetchQuizTakenById);
  return fetchQuizTakenById;
}

// Get quizTaken submission date
export async function getQuizTakenHistory() {
  const userSession = await getUserSession();
  const quizzes = await prisma.quiz.findMany({
    where: { facultyId: userSession?.user.id },
    select: { id: true, quizName: true },
  });
  console.log("Quizzes: ", quizzes);

  const quizTakenHistory: {
    quiz: { id: string; quizName: string };
    quizTaken: { id: string }[];
  }[] = [];

  for (const quiz of quizzes) {
    const quizTaken = await prisma.quizTaken.findMany({
      where: { quizId: quiz.id },
      select: { id: true },
    });
    quizTakenHistory.push({ quiz, quizTaken });
  }

  const quizTakenIds = quizTakenHistory.map((item) =>
    item.quizTaken.map((itemTaken) => itemTaken.id),
  );

  const finalData = quizzes.map((quizHistory) => ({
    quizId: quizHistory.id,
    quizName: quizHistory.quizName,
  }));

  const flatQuizTakenIds = quizTakenIds.flat();

  console.log(flatQuizTakenIds);

  const documents = await prisma.quiz_Result.findMany({
    where: {
      quizTakenId: {
        in: flatQuizTakenIds,
      },
    },
    include: { student: true },
    orderBy: {
      dateTaken: "desc",
    },
    take: 10,
  });
  const sortedDocuments = documents.sort((a: any, b: any) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  console.log("Documents", documents.length);

  console.log(quizTakenHistory);
  console.log(sortedDocuments);

  // Iterate over each document in the sorted documents array
  const documentsWithQuizName = sortedDocuments.map((doc) => {
    // Find the corresponding quizTaken object in the quizTakenHistory
    const matchingQuizTaken = quizTakenHistory.find((quizTaken) =>
      quizTaken.quizTaken.some((quiz) => quiz.id === doc.quizTakenId),
    );

    // If a matching quizTaken object is found, extract the quizName
    const quizName = matchingQuizTaken
      ? matchingQuizTaken.quiz.quizName
      : "Unknown";

    // Add the quizName to the document and return the modified document
    return { ...doc, quizName };
  });

  console.log(documentsWithQuizName);

  console.log("finalData", finalData);
  return documentsWithQuizName;
}

export async function getStudentBySection(sectionsHandled: string[]) {
  const studentsBySection = await prisma.student.findMany({
    where: {
      section: {
        in: sectionsHandled,
      },
    },
  });
  return studentsBySection;
}

export async function getStudentBySectionCount(sectionsHandled: string[]) {
  interface SectionCount {
    section: string;
    count: number;
  }

  const results: SectionCount[] = [];

  for (const section of sectionsHandled) {
    const count = await prisma.student.count({
      where: {
        section: section,
      },
    });

    results.push({ section, count });
  }
  return results;
}

// Get Quiz using Faculty
export async function getQuizzesList_faculty() {
  const userSession = await getUserSession();

  const getAllQuizzes = await prisma.quiz.findMany({
    where: { facultyId: userSession?.user.id },
    include: { questions: true },
  });

  console.log(getAllQuizzes);
  /*  const { section }: any = userSession?.user.userSection;
  console.log("HAHA", section);

  //Filter Quiz Data base from Current Section
  const quizzesBasedOnSection = getAllQuizzes.filter((quiz) =>
    quiz.sectionAssigned.includes(section)
  );
  console.log("Filtered:", quizzesBasedOnSection); */

  const getQuizzesCount = await prisma.quiz.count();
  const getQuizzesTakenCountByUser = await prisma.quizTaken.count({
    where: {
      studentId: userSession?.user.id,
      isDone: true,
    },
  });

  const formatCount = { getQuizzesCount, getQuizzesTakenCountByUser };

  console.log(getQuizzesCount, getQuizzesTakenCountByUser);

  const getAllTakenQuiz = await prisma.quizTaken.findMany({});
  return { getAllQuizzes, getAllTakenQuiz, formatCount };
}

// Save Feedback to db
export async function setFeedback(
  quizId: string,
  quizName: string,
  feedbacks: feedbackSchemaType,
) {
  const session = await getUserSession();
  try {
    const getClusterAssignments = await getStudentClusterAssignments(quizId);

    const updateFacultyFeedback = await prisma.feedbacksPosted.upsert({
      where: {
        quizId: quizId,
      },
      update: {
        quizName: quizName,
        PostedFeedbacks: feedbacks.postedFeedbacks,
        StudentClusters: { update: { assignment: getClusterAssignments } },
      },
      create: {
        facultyId: session?.user.id,
        quizName: quizName,
        PostedFeedbacks: feedbacks.postedFeedbacks,
        Quiz: { connect: { id: quizId } },
        StudentClusters: { create: { assignment: getClusterAssignments } },
      },
    });
    console.log(updateFacultyFeedback);
    return updateFacultyFeedback;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

// Get Previous Feedback
export async function getPrevFeedback(quizId: string) {
  const getFeedback = await prisma.feedbacksPosted.findUnique({
    where: {
      quizId: quizId,
    },
    select: {
      PostedFeedbacks: true,
    },
  });
  return getFeedback;
}

// Update Quiz
export async function updateQuiz(
  updateQuizData: QuizFields,
  quizIdLocal: string,
  questionsLocal: any,
) {
  const session = await getUserSession();

  console.log("===========");
  console.log("Submitted Data", updateQuizData);
  console.log("===========");
  console.log("Local: ", questionsLocal);
  console.log("===========");

  const filteredIds = updateQuizData.questions
    .filter((question) => question.id !== "")
    .map((question) => question.id);

  /* const test = updateQuizData.questions
    .filter((question, index) => !filteredIds[index])
    .map((question) => ({
      questionText: question.questionText,
    }));

  console.log(test); */

  try {
    const updatedQuizResult = await prisma.quiz.update({
      where: { id: quizIdLocal },
      data: {
        facultyName: session?.user.name, // Update faculty name if needed
        quizName: updateQuizData.quizName, // Update quiz name if needed
        numberOfItems: updateQuizData.numberOfItems, // Update number of items if needed
        sectionAssigned: updateQuizData.sectionAssigned,
        subject: updateQuizData.subject, // Update subject if needed
        questions: {
          updateMany: updateQuizData.questions
            .filter((question, index) => filteredIds[index])
            .map((question, index) => ({
              where: { id: filteredIds[index] },
              data: {
                questionText: question.questionText,
                options: question.options,
                correctAnswer: question.correctAnswer,
              },
            })),
          create: updateQuizData.questions
            .filter((question, index) => !filteredIds[index])
            .map((question) => ({
              // Here is the change
              questionText: question.questionText,
              options: question.options,
              correctAnswer: question.correctAnswer,
            })),
        },
        Faculty: { connect: { facultyId: session?.user.id } }, // Connect faculty if needed
      },
      include: { questions: true }, // Include questions in the updated quiz result
    });
    console.log(JSON.stringify(updatedQuizResult, null, 2));
    revalidatePath("/dashboard/quizzes");
    return updatedQuizResult;
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify(error));
  }

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
    /* prisma.quizTaken.deleteMany({
      where:
    }), */

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

//--------------------- Student Actions

// Get Quiz using student
export async function getQuizzesList_student() {
  const userSession = await getUserSession();

  const getAllQuizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });

  console.log(getAllQuizzes);
  const section = userSession?.user.userSection;
  console.log("HAHA", section);

  //Filter Quiz Data base from Current Section
  const quizzesBasedOnSection = getAllQuizzes.filter((quiz) => {
    console.log("Quiz Section:", quiz.sectionAssigned);
    console.log("User Section:", section);
    return quiz.sectionAssigned.includes(section as string);
  });
  console.log("Filtered:", quizzesBasedOnSection);

  const getQuizzesCount = await prisma.quiz.count();
  const getQuizzesTakenCountByUser = await prisma.quizTaken.count({
    where: {
      studentId: userSession?.user.id,
      isDone: true,
    },
  });

  const formatCount = { getQuizzesCount, getQuizzesTakenCountByUser };

  console.log(getQuizzesCount, getQuizzesTakenCountByUser);

  const getAllTakenQuiz = await prisma.quizTaken.findMany({});
  return { getAllQuizzes, getAllTakenQuiz, formatCount, quizzesBasedOnSection };
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
  studentResult: Student_Quiz_Result,
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

    if (existingQuiz.retriesLeft <= 1 || studentResult.isPerfect === true) {
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
    revalidatePath("/dashboard/");
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

    if (studentResult.isPerfect === true) {
      console.log("pasok HAHAHA");
      const updateStudentDone = await prisma.quizTaken.update({
        where: {
          id: saveToStudentTakenQuiz?.id,
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
        quizTaken: { connect: { id: saveToStudentTakenQuiz.id } },
        student: { connect: { studentId: userSession?.user.id as string } },
      },
      include: { quizTaken: true },
    });

    console.log(saveToStudentTakenQuiz, saveResult);
    revalidatePath("/dashboard/");
    revalidatePath("/dashboard/quizzes");
    redirect("/dashboard/quizzes");
  }
}
//  Take Quiz Using code
export async function takeQuizUseCode(quizCodeLocal: string) {
  const userSession = await getUserSession();
  const section: any = userSession?.user.userSection;

  const findQuiz = await prisma.quiz.findUnique({
    where: { quizCode: quizCodeLocal },
  });

  if (!findQuiz) {
    return "No Quiz Found";
  }

  const checkQuizIsAssigned = findQuiz.sectionAssigned.includes(section);
  console.log(checkQuizIsAssigned);

  console.log(checkQuizIsAssigned);
  if (checkQuizIsAssigned === false) {
    return "Quiz is not assigned in your section";
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
// Fetch Quiz Names for popover
export async function getQuizNames() {
  const userSession = await getUserSession();
  const quizNames = await prisma.quiz.findMany({
    where: { sectionAssigned: { has: userSession?.user.userSection } },
    select: {
      id: true,
      quizName: true,
    },
  });

  console.log(quizNames);

  const mappedQuizNames = quizNames.map((quiz) => {
    const quizNames = {
      id: quiz.id,
      value: quiz.quizName.toLowerCase(),
      label: quiz.quizName,
    };
    return quizNames;
  });
  console.log(mappedQuizNames);
  return mappedQuizNames;
}

export async function getFeedback(quizId: string) {
  const userSession = await getUserSession();
  try {
    const fetchFeedback = await prisma.feedbacksPosted.findUnique({
      where: { quizId },
      include: { StudentClusters: true },
    });

    const postedFeedbacks = fetchFeedback?.PostedFeedbacks;
    const assignment = fetchFeedback?.StudentClusters?.assignment;

    const findAssignment: any = assignment?.find(
      (testAssignment: any) =>
        testAssignment.studentId === userSession?.user.id,
    );

    if (postedFeedbacks && assignment) {
      const finalData = {
        ...findAssignment,
        feedback: postedFeedbacks[findAssignment.cluster],
      };
      console.log(finalData);
      return finalData;
    }
  } catch (error) {
    console.log(error);
    return "No Quiz Found";
  }

  /* console.log(findAssignment);
  console.log(postedFeedbacks, assignment);
  console.log(userSession); */
  //console.log(JSON.stringify(fetchFeedback, null, 2));
}

// Get quizTaken submission date
export async function getUserQuizTakenHistory() {
  const userSession = await getUserSession();

  const quizzesTaken = await prisma.quizTaken.findMany({
    where: { studentId: userSession?.user.id },
    select: { id: true, quizId: true },
  });

  const quizTakenHistory: {
    quiz: { id: string; quizName: string }[];
    quizTakenId: { id: string };
    quizResult: any[];
  }[] = [];

  for (const quiz of quizzesTaken) {
    const getQuizName = await prisma.quiz.findMany({
      where: { id: quiz.quizId },
      select: { id: true, quizName: true },
    });

    const getQuizResult = await prisma.quiz_Result.findMany({
      where: {
        quizTakenId: quiz.id,
      },
    });

    quizTakenHistory.push({
      quiz: getQuizName,
      quizTakenId: { id: quiz.id },
      quizResult: getQuizResult,
    });
  }

  // Flatten the array and include quizName in each quiz result
  const allQuizResults = quizTakenHistory.flatMap((item) =>
    item.quizResult.map((result) => ({
      quizName: item.quiz[0].quizName,
      ...result,
      dateTaken: result.dateTaken,
    })),
  );

  allQuizResults.sort(
    (a, b) => new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime(),
  );

  /*  console.log("Quiz Taken", quizzesTaken);
  console.log("History", JSON.stringify(quizTakenHistory, null, 2));
  console.log(allQuizResults); */
  return allQuizResults;
  // console.log("History", quizTakenHistory.flat());
}

// Get Completed Quizzes
export async function getUserCompletedQuizzes() {
  const userSession = await getUserSession();
  const completedQuizzes = await prisma.quizTaken.findMany({
    where: {
      AND: [
        {
          studentId: userSession?.user.id,
        },
        {
          isDone: true,
        },
      ],
    },
    include: { quiz: { select: { quizName: true, subject: true } } },
  });

  console.log("Completed");
  return completedQuizzes;
}

// Get Unfinished Quizzes count
export async function getUserUnfinishedQuizzesCount() {
  const userSession = await getUserSession();

  const quiz = await prisma.quiz.findMany({
    where: { sectionAssigned: { has: userSession?.user.userSection } },
    select: { id: true },
  });

  // console.log("HAHAHAHAHA", quiz);
  const test = quiz.map((item) => item.id);

  const finishedQuizzes = await prisma.quizTaken.count({
    where: { AND: [{ quizId: { in: test }, studentId: userSession?.user.id }] },
  });

  console.log(quiz.length - finishedQuizzes);

  console.log("Ilan? ", finishedQuizzes);

  return quiz.length - finishedQuizzes;
}

// Get Student ranking
export async function getStudentRankingByQuiz(quizId: string) {
  const apiData = await getStudentRecords(quizId);
  const newData = apiData.map((info: any) => ({
    studentId: info.studentId,
    score: info.averageScore,
  }));

  newData.sort((a: any, b: any) => b.score - a.score);

  console.log(newData);

  const scoreMap = new Map();

  newData.forEach(
    ({ studentId, score }: { studentId: string; score: number }) => {
      if (!scoreMap.has(score)) {
        scoreMap.set(score, []);
      }
      scoreMap.get(score).push({ studentId, score });
    },
  );

  // Extract the arrays of student objects for each unique score
  const top5Scores = Array.from(scoreMap.keys())
    .sort((a, b) => b - a)
    .slice(0, 5)
    .map((score) => scoreMap.get(score));

  console.log("Top 5", top5Scores);

  const studentIds = top5Scores.flatMap((scores) =>
    scores.map((student: { studentId: string }) => student.studentId),
  );

  console.log(studentIds);

  const students = await prisma.student.findMany({
    where: { studentId: { in: studentIds } },
    select: { studentId: true, name: true, section: true },
  });

  console.log(students);

  console.log("Length: ", studentIds.length, students.length);

  const studentIdMap = new Map();

  students.forEach((student) => {
    studentIdMap.set(student.studentId, {
      name: student.name,
      section: student.section,
    });
  });

  const result = top5Scores.map((scores) =>
    scores.map(
      ({ studentId, score }: { studentId: string; score: number }) => ({
        ...studentIdMap.get(studentId),
        score,
      }),
    ),
  );

  console.log(result);

  const resultArray = result.map((array, index) => ({
    [`top${index + 1}`]: array,
  }));

  const top5Object: any = {};

  resultArray.forEach((obj) => {
    const key = Object.keys(obj)[0]; // Get the key (top1, top2, etc.)
    top5Object[key] = obj[key]; // Assign the value to the key in the top5Object
  });

  console.log(top5Object);
  return top5Object;
}

export async function getQuizResultByUser(quizId: string) {
  const userSession = await getUserSession();
  const results = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      QuizTaken: {
        where: { studentId: userSession?.user.id },
        select: { isPerfect: true, retriesLeft: true, results: true },
      },
    },
  });
  console.log(results);
  if (!results) {
    return "No Record Found";
  }

  return results;
}
