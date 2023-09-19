import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  price: number;
}
