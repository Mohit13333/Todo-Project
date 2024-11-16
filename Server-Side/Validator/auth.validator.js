import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(10, { message: "Invalid Credentials" })
    .max(40, { message: "Invalid Credentials" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(8, { message: "Invalid Credentials" })
    .max(15, { message: "Invalid Credentials" }),
});

const signupSchema = z.object({
  userName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(5, { message: "Name must be atleast 5 characters" })
    .max(15, { message: "Name must not more than 15 charcterws" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(10, { message: "email must be atleast 10 characters" })
    .max(40, { message: "email must not more than 40 charcterws" }),
  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be atleast 10 characters" })
    .max(12, { message: "phone must not more than 12 charcterws" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(8, { message: "password must be atleast 8 characters" })
    .max(15, { message: "password must not more than 15 charcterws" }),
});

export {signupSchema,loginSchema};;