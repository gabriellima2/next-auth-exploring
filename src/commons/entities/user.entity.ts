import { UserType } from "@/commons/constants/user-type"

export interface UserEntity {
	id: string
	type: UserType.ADMIN | UserType.COMMON
	name: string
	email: string
	password: string
	token: string
}
