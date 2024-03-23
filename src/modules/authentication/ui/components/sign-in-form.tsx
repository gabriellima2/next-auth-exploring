"use client"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import { Form, FormControl, FormField, FormLabel, FormMessage } from "@/commons/ui/components/form"
import { Button } from "@/commons/ui/components/button"
import { Input } from "@/commons/ui/components/input"

import { useToast } from "@/commons/hooks/use-toast"

import { SignInSchema, signInSchema } from "../../schemas/sign-in.schema"

export function SignInForm() {
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm<SignInSchema>({
		defaultValues: { email: "", password: "" },
		resolver: zodResolver(signInSchema)
	})

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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((credentials) => handleSignIn(credentials))}
				className="w-full flex flex-col gap-6"
			>
				<FormField
					name="email"
					render={({ field }) => (
						<div className="space-y-2">
							<FormLabel>Email*</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Enter your best email..." {...field} />
							</FormControl>
							<FormMessage />
						</div>
					)}
				/>
				<FormField
					name="password"
					render={({ field }) => (
						<div className="flex flex-col items-end gap-2">
							<div className="w-full space-y-2">
								<FormLabel>Password*</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password with a minimum of 6 chars..." {...field} />
								</FormControl>
								<FormMessage />
							</div>
							<Link href="#" className="text-sm">Forgot Password?</Link>
						</div>
					)}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Form>
	)
}
