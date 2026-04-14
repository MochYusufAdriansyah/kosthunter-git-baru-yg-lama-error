import { IsString, IsInt } from "class-validator";

export class CreateKosDto {

  @IsString()
  name: string | undefined;

  @IsString()
  address: string | undefined;

  @IsString()
  gender: string | undefined;

  @IsInt()
  price: number | undefined;

  @IsInt()
  ownerId: number | undefined;

}
