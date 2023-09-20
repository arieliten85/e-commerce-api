import { Images } from "../../domain/images.domain";

export const IMAGES_REPOSITORY = "IMAGES_REPOSITORY";

export interface ImagesRepository {
  create(images: Images): Promise<Images>;
  findAll(): Promise<Images[]>;
  findById(id: number): Promise<Images>;
  update(id: number, url: Images): Promise<Images>;
  delete(id: number): Promise<void>;
}
