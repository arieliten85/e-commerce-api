import { Inject, Injectable } from "@nestjs/common";
import { CreateImagesDto } from "../controllers/dto/create-image.dto";
import { UpdateImageDto } from "../controllers/dto/update-image.dto";
import {
  IMAGES_REPOSITORY,
  ImagesRepository,
} from "./repository/images.repository";

import { Images } from "../domain/images.domain";
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from "../../product/aplication/repository/product.repositorio";
import {
  IMAGES_STORAGE_FS_REPOSITORY,
  ImagesFsRepository,
} from "./repository/images.fs.repository";

@Injectable()
export class ImagesService {
  constructor(
    @Inject(IMAGES_REPOSITORY)
    private readonly imagesRepository: ImagesRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(IMAGES_STORAGE_FS_REPOSITORY)
    private readonly imagesFsRepository: ImagesFsRepository,
  ) {}

  async create(createImagesDto: CreateImagesDto) {
    const { buffer, url, product_id } = createImagesDto;

    const filePathImage = await this.imagesFsRepository.create(buffer, url);

    const productFind = await this.productRepository.findOne(product_id);

    const newImagesUrl = new Images();
    newImagesUrl.url = filePathImage;
    newImagesUrl.product = productFind;

    //console.log("IMAGES", newImagesUrl);

    const ImagesCreated = await this.imagesRepository.create(newImagesUrl);
    return ImagesCreated;
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    console.log(updateImageDto);
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
