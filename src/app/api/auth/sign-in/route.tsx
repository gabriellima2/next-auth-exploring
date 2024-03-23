import { NextResponse } from "next/server"

import { UserEntity } from "@/commons/entities/user.entity"
import { UserType } from "@/commons/constants/user-type"

import { SignInSchema, signInSchema } from "@/modules/authentication/schemas/sign-in.schema"
import { SignInDTO } from "@/modules/authentication/dtos/sign-in.dto"

const MOCK_CREDENTIALS: UserEntity[] = [
	{
		id: '71b9df1a-675b-4614-aab9-78d22d3645b2',
		email: "admin@domain.com",
		password: "000000",
		name: "System Admin",
		type: UserType.ADMIN,
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MWI5ZGYxYS02NzViLTQ2MTQtYWFiOS03OGQyMmQzNjQ1YjIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJuYW1lIjoiU3lzdGVtIEFkbWluIiwidHlwZSI6IkFETUlOIiwiaWF0IjoxNTE2MjM5MDIyfQ.UFahj3TSX6yQjUe4VemHbH7b7OQNjTVAC9JWifbHU20",
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
