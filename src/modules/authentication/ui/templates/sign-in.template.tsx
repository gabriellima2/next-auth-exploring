import Link from "next/link";
import { SignInForm } from "../components/sign-in-form";

export function SignInTemplate() {
	return (
		<main className="h-screen flex items-center justify-center min-h-[340px]">
			<article className="w-full max-w-[544px] flex flex-col gap-6 bg-polar-night-foreground-primary p-6 rounded-lg shadow">
				<h1 className="font-semibold text-2xl">Welcome Back!</h1>
				<div className="flex flex-col items-center justify-center gap-6">
					<SignInForm />
					<p>Don't have an account? <Link href="#" className="text-frost-blue-primary">Sign Up</Link></p>
				</div>
			</article>
		</main>
	)
}
