import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { nextAuthConfig } from "@/modules/authentication/config/next-auth.config"

export default async function HomePage() {
	const session = await getServerSession(nextAuthConfig)
	if (!session) return redirect("/")
	return <h1>Hello {session.name}!</h1>
}
