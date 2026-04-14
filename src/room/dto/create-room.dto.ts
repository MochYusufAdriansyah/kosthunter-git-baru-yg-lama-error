import { IsString, IsInt } from "class-validator";

export class CreateRoomDto {

  @IsString()
  number: string | undefined;

  @IsString()
  status: string | undefined; // contoh: AVAILABLE / BOOKED

  @IsInt()
  kosId: number | undefined;

}
