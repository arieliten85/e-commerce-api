import { Injectable } from "@nestjs/common";
import { CreateImagesDto } from "../../controllers/dto/create-image.dto";
import { Images } from "../../domain/images.domain";
import { ImagesEntity } from "../../infrastruture/entities/images.entity";
import { ProductEntity } from "src/modules/product/infrastucture/entities/product.entity";

@Injectable()
export class MapperImages {
  dtoToClassImages(imagesDTO: CreateImagesDto) {
    const newImages = new Images();

    newImages.url = imagesDTO.url;
    newImages.product_id = imagesDTO.product_id;
    newImages.product = imagesDTO.product;
    return newImages;
  }
  dtoImagesToImages(images: string[]): Images[] {
    return images.map((imageUrl) => {
      const image = new Images();
      image.url = imageUrl;
      return image;
    });
  }
  classToEntityImages(classInstance: Images): ImagesEntity {
    const newEntity = new ImagesEntity();

    newEntity.url = classInstance.url;
    newEntity.product = classInstance.product as ProductEntity;
    return newEntity;
  }
  entityToClassImages(classEntity: ImagesEntity) {
    const newImages = new Images();

    newImages.id = classEntity.id;
    newImages.url = classEntity.url;
    newImages.product = classEntity.product;

    return newImages;
  }
}
