"use client"
import { Button } from "./button";
import { useAuth } from "@/modules/authentication/hooks/use-auth";

export function LogoutButton() {
	const { handleLogout } = useAuth()
	return (
		<Button type="button" variant="outline" onClick={handleLogout}>
			Sair
		</Button>
	)
}
