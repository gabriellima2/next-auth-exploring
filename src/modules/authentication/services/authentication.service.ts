import { UserEntity } from "@/commons/entities/user.entity";
import { SignInSchema } from "../schemas/sign-in.schema";

export interface AuthenticationService {
	signIn(credentials: SignInSchema): Promise<UserEntity | undefined>
}
