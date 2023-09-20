import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 1000)
  desc: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
