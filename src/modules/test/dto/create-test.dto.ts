import { IsString } from "class-validator";

export class CreateTestDto {
  @IsString()
  number: string;
}
