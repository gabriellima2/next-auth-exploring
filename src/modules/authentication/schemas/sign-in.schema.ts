import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string({
		required_error: 'The email field is required',
		invalid_type_error: 'Please, type a valid email'
	})
		.min(1, { message: 'The email field is required' })
		.email({ message: 'Please, type a valid email' }),
	password: z.string({
		required_error: 'The password field is required',
		invalid_type_error: 'Please, type a valid password'
	})
		.min(1, { message: 'The password field is required' })
		.refine((value) => value.length >= 6, { message: 'Password must contain at least 6 characters' }),
})

export type SignInSchema = z.infer<typeof signInSchema>
