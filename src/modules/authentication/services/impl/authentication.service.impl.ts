import { AuthenticationService } from "../authentication.service";

import { UserEntity } from "@/commons/entities/user.entity";
import { SignInSchema } from "../../schemas/sign-in.schema";

class AuthenticationServiceImpl implements AuthenticationService {
	constructor(private readonly baseUrl: string) {}
	async signIn(credentials: SignInSchema): Promise<UserEntity | undefined> {
		console.log(credentials)
		const url = `${this.baseUrl}/api/auth/sign-in`
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(credentials)
		})
		if (!response.ok) return
		return await response.json() as UserEntity
	}
}


export const makeAuthenticationService = () => new AuthenticationServiceImpl("http://localhost:3000")
