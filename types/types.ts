import { z } from "zod";

// Auth || Create User Schema

export const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[!@#$%^&*(),.?":{}|<>]/),
  // Define role as an enum with possible values 'faculty' and 'student'
});

export const SignUpFormSchema = FormSchema.merge(
  z.object({
    name: z.string().min(1, "Name should not be Empty"),
    username: z.string().min(1, "Username should not be Empty"),
    classSection: z.string().min(1, "Section should not be Empty").optional(),
    role: z.enum(["faculty", "student"]),
  })
);

export type FormFields = z.infer<typeof FormSchema>;
export type SignUpFormFields = z.infer<typeof SignUpFormSchema>;

// Create Quiz Schema

export const QuizSchema = z.object({
  id: z.string().optional(),
  quizName: z.string().min(1),
  numberOfItems: z.number().min(1).max(100),
  subject: z.string().min(1),
  selectedSections: z.array(z.string()),
  questions: z.array(
    z.object({
      id: z.string().optional(),
      questionText: z.string().min(1),
      correctAnswer: z.string().min(1),
      options: z.array(z.string().min(1)),
    })
  ),
});

export type QuizFields = z.infer<typeof QuizSchema>;

export const QuizAnswersSchema = z.object({
  studentAnswers: z.array(z.object({ answer: z.string().min(1) })),
});
export type QuizAnswerFields = z.infer<typeof QuizAnswersSchema>;

export type Student_Quiz_Result = {
  studentScore: number;
  isPerfect: boolean;
  focusCount: number;
  numberOfAnswerClicks: number;
  finalTime: number;
  finalTime_str: string;
};

export interface ScoreResult {
  score: number;
  perfect: boolean;
}

// Define a regular expression pattern for the code
const codePattern = /^[a-zA-Z0-9]{6}$/;

export const codeSchema = z.string().regex(codePattern);

export const quizCodeSchema = z.object({
  quizCode: z.string().min(1).max(6),
});
export type quizCodeField = z.infer<typeof quizCodeSchema>;
