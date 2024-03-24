import { getServerSession } from "next-auth"

import { nextAuthConfig } from "@/modules/authentication/config/next-auth.config"
import { LogoutButton } from "@/commons/ui/components/logout-button"

export async function HomeTemplate() {
	const session = await getServerSession(nextAuthConfig)
	return (
		<main className="w-full h-screen min-h-[156px] flex items-center justify-center flex-col">
			<div className="flex items-center justify-center flex-col gap-6">
				<h1>Hello <strong>{session?.name}!</strong></h1>
				<LogoutButton />
			</div>
		</main>
	)
}
