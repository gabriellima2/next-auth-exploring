import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react"

import { useToast } from "@/commons/hooks/use-toast"
import { SignInSchema } from "../schemas/sign-in.schema"

export function useAuth() {
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

	async function handleLogout() {
		await signOut({ redirect: false })
		router.replace("/")
	}

	return {
		handleSignIn,
		handleLogout,
	}
}
