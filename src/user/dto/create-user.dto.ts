import { Role } from "@prisma/client";

export class CreateUserDto {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: Role | undefined;
}
