import NextAuth from "next-auth";
import { SignInDTO } from "@/modules/authentication/dtos/sign-in.dto";

declare module "next-auth" {
	interface Session extends SignInDTO {}
}
