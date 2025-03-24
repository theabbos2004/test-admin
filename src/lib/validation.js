import { z } from "zod";

export const loginSchema = z.object({
    usename: z.string(),
    password: z.string().min(1, "Parol kamida 1 ta belgidan iborat bo‘lishi kerak"),
  });

export const AddTestSchema = z.object({
  question: z.string().min(1,"Savolni kiriting"),
  optionEntities: z.array(
    z.object({
      optionText: z.string().min(1, "Javob kiritilishi shart"),
      correct: z.boolean().optional()
    })
  )
  .refine((option) => option.some((v) => v.correct), {
    message: "Kamida bitta to'g'ri javob tanlang",
  }),
});


export const AddGroupSchema = z.object({
  name: z.string().min(1,"Guruh nomini kiriting"),
  testTime:z.number()
});