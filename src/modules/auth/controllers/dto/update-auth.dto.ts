import { PartialType } from "@nestjs/mapped-types";
import { RegisterDto } from "./RegisterDto";

export class UpdateAuthDto extends PartialType(RegisterDto) {}
