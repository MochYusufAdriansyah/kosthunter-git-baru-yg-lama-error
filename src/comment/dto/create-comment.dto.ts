import { IsString, IsInt, IsOptional } from "class-validator";

export class CreateCommentDto {

  @IsString()
  content: string | undefined;

  @IsInt()
  kosId: number | undefined;

  @IsOptional()
  @IsString()
  reply?: string;

}
