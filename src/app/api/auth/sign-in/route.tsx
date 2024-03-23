import { NextResponse } from "next/server"

import { UserEntity } from "@/commons/entities/user.entity"
import { UserType } from "@/commons/constants/user-type"

import { SignInSchema, signInSchema } from "@/modules/authentication/schemas/sign-in.schema"
import { SignInDTO } from "@/modules/authentication/dtos/sign-in.dto"

const MOCK_CREDENTIALS: UserEntity[] = [
	{
		id: '9ef72e00-bd1a-42f4-882e-1719708f7a33',
		email: "admin@domain.com",
		password: "000000",
		name: "System Admin",
		type: UserType.ADMIN,
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ZWY3MmUwMC1iZDFhLTQyZjQtODgyZS0xNzE5NzA4ZjdhMzMiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJuYW1lIjoiU3lzdGVtIEFkbWluIiwidHlwZSI6IkFETUlOIiwiaWF0IjoxNTE2MjM5MDIyfQ.7zGiLdAgpaL7KI64Yr5VL8AWTc7V96cbIqH7omhiw2M",
	},
	{
		id: '0fe91790-197a-42d7-9ea2-eac604969d4e',
		email: "user@domain.com",
		password: "000000",
		name: "Common User",
		type: UserType.COMMON,
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZmU5MTc5MC0xOTdhLTQyZDctOWVhMi1lYWM2MDQ5NjlkNGUiLCJlbWFpbCI6InVzZXJAZG9tYWluLmNvbSIsIm5hbWUiOiJDb21tb24gVXNlciIsInR5cGUiOiJDT01NT04iLCJpYXQiOjE1MTYyMzkwMjJ9.CKZZpafyWbxfbpAWy8IqLxUYahcJqV_J-h-f34tuomI",
	}
]

function FAKE_DB_QUERY(credentials: SignInSchema) {
	return MOCK_CREDENTIALS.filter((mock) => {
		return mock.email === credentials.email && mock.password === credentials.password
	})
}

export async function POST(request: Request) {
	const params = await request.json()
	const credentials = signInSchema.safeParse(params)
	if (!credentials.success) {
		return NextResponse.json(credentials.error.errors[0].message, { status: 400 })
	}
	const findedUser = FAKE_DB_QUERY(credentials.data)
	if (!findedUser || !findedUser.length) {
		return NextResponse.json({ data: "Invalid email or password" }, { status: 400 })
	}
	const data: SignInDTO = {
		id: findedUser[0].id,
		name: findedUser[0].name,
		email: findedUser[0].email,
		type: findedUser[0].type,
		token: findedUser[0].token,
	}
	return NextResponse.json(data, { status: 200,	})
}
