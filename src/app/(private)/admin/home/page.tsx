import { getServerSession } from "next-auth"
import { nextAuthConfig } from "@/modules/authentication/config/next-auth.config"

export default async function HomePage() {
	const session = await getServerSession(nextAuthConfig)
	return <h1>Hello {session?.name}!</h1>
}
