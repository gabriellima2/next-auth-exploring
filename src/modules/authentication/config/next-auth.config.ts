import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { makeAuthenticationService } from "../services/impl/authentication.service.impl";
import { signInSchema } from "../schemas/sign-in.schema";

const authenticationService = makeAuthenticationService()

export const nextAuthConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" }
			},
			async authorize(params) {
				const credentials = signInSchema.safeParse(params)
				if (!credentials.success) {
					throw new Error(credentials.error.errors[0].message)
				}
				const user = await authenticationService.signIn(credentials.data)
				if (!user) return null
				return user
			}
		})
	],
	pages: {
		signIn: "/",
		error: "/"
	},
}
