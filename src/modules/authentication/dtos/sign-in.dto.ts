import { UserEntity } from "@/commons/entities/user.entity";

export type SignInDTO = Pick<UserEntity, "id" | "email" | "name" | "token" | "type">
