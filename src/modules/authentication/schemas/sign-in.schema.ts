import { z } from "zod";

export const signInSchema = z.object({
	email: z.string({
		required_error: "The email field is required",
		invalid_type_error: "Please, type a valid email"
	}).email({ message: "Please, type a valid email" }),
	password: z.string({
		required_error: "The password field is required",
		invalid_type_error: "Please, type a valid password"
	}).min(6, { message: "Password must contain at least 6 characters" })
})

export type SignInSchema = z.infer<typeof signInSchema>
