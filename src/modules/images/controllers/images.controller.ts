import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from "@nestjs/common";
import { ImagesService } from "../aplication/images.service";

import { FileInterceptor } from "@nestjs/platform-express";

import { UpdateImageDto } from "./dto/update-image.dto";
import { memoryStorage } from "multer";
import { CreateImagesDto } from "./dto/create-image.dto";

const storage = memoryStorage();

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: storage,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("product_id", ParseIntPipe) product_id: number,
  ) {
    const createImagesDto: CreateImagesDto = {
      url: file.originalname,
      product_id: product_id,
      buffer: file.buffer,
    };

    return this.imagesService.create(createImagesDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imagesService.remove(+id);
  }
}
