import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { useToast } from "@/commons/hooks/use-toast"
import { SignInSchema } from "../schemas/sign-in.schema"

export function useSignIn() {
	const router = useRouter()
	const { toast } = useToast()

	async function handleSignIn(credentials: SignInSchema) {
		const result = await signIn("credentials", {
			...credentials,
			redirect: false,
		})
		if (result?.error || !result?.ok) {
			return toast({
				title: "Authentication Failed",
        description: "An error occurred while authenticating, please try again!",
			})
		}
		router.replace("/home")
	}

	return {
		handleSignIn
	}
}
