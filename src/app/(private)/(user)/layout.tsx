import { PropsWithChildren } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { nextAuthConfig } from "@/modules/authentication/config/next-auth.config";
import { UserType } from "@/commons/constants/user-type";

export default async function Layout(props: PropsWithChildren) {
	const { children } = props
	const session = await getServerSession(nextAuthConfig)

	if (!session) return redirect("/")
	if (session.type === UserType.ADMIN) return redirect("/admin/home")

	return (
		<>
			{children}
		</>
	)
}
