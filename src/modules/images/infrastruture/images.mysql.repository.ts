import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImagesRepository } from "../aplication/repository/images.repository";
import { ImagesEntity } from "./entities/images.entity";
import { Images } from "../domain/images.domain";
import { MapperImages } from "../aplication/mappers/mapper.service.images";
import { UpdateImageDto } from "../controllers/dto/update-image.dto";

@Injectable()
export class ImagesMysqlRepository implements ImagesRepository {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly mapperImages: MapperImages,
  ) {}

  async create(images: Images) {
    const imageEntity = this.mapperImages.classToEntityImages(images);
    const savedImage = await this.imagesRepository.save(imageEntity);
    return this.mapperImages.entityToClassImages(savedImage);
  }

  async findAll(): Promise<Images[]> {
    const imagesEntities = await this.imagesRepository.find({
      relations: { product: true },
    });

    return imagesEntities.map((imgEntity) =>
      this.mapperImages.entityToClassImages(imgEntity),
    );
  }

  async findById(id: number): Promise<Images> {
    const imageEntity = await this.imagesRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!imageEntity) {
      return null;
    }

    return this.mapperImages.entityToClassImages(imageEntity);
  }

  async update(id: number, newProduct: UpdateImageDto): Promise<Images> {
    const imageEntity = await this.imagesRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    this.imagesRepository.merge(imageEntity, newProduct);
    const updatedImage = await this.imagesRepository.save(imageEntity);

    return this.mapperImages.entityToClassImages(updatedImage);
  }

  async delete(id: number): Promise<void> {
    await this.imagesRepository.delete(id);
  }
}
