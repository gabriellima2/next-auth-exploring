import { UserEntity } from "@/entities/user.entity";

export type SignInDTO = Pick<UserEntity, "id" | "email" | "name" | "token" | "type">
