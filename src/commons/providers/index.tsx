"use client"
import { PropsWithChildren } from "react";
import { SessionProvider } from "./session.provider";

export function Providers(props: PropsWithChildren) {
	const { children } = props
	return (
		<SessionProvider>
			{children}
		</SessionProvider>
	)
}
