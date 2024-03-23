import { PropsWithChildren } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export function SessionProvider(props: PropsWithChildren) {
	const { children } = props
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
