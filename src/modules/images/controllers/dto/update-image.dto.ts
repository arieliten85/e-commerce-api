import { PartialType } from "@nestjs/mapped-types";
import { CreateImagesDto } from "./create-image.dto";

export class UpdateImageDto extends PartialType(CreateImagesDto) {}
