import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { CreateProductDto } from "../controllers/dto/create-product.dto";
import { UpdateProductDto } from "../controllers/dto/update-product.dto";
import { ProductMysqlRepository } from "../infrastucture/product.mysql";
import { PRODUCT_REPOSITORY } from "./repository/product.repositorio";
import { MapperProduct } from "./mappers/mappers.product";
import { Product } from "../dominio/producto.domain";

const MESSAGE_ERROR = {
  PRODUCT_NOT_FOUND: "Product not found",
};

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductMysqlRepository,

    private readonly mapperProduct: MapperProduct,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productClass = this.mapperProduct.dtoToClass(createProductDto);

    return await this.productRepository.create(productClass);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const userFound = await this.productRepository.findOne(id);

    if (!userFound) {
      throw new BadRequestException(MESSAGE_ERROR.PRODUCT_NOT_FOUND);
    }

    return userFound;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const userFound: Product = await this.findOne(id);

    if (!userFound) {
      throw new BadRequestException(MESSAGE_ERROR.PRODUCT_NOT_FOUND);
    }

    const userFoundClass = this.mapperProduct.classToEntity(userFound);
    const productClass = this.mapperProduct.dtoToClass(updateProductDto);

    return this.productRepository.update(userFoundClass, productClass);
  }

  async delete(id: number): Promise<string> {
    const userFound: Product = await this.findOne(id);

    if (!userFound) {
      throw new BadRequestException(MESSAGE_ERROR.PRODUCT_NOT_FOUND);
    }
    const affected = await this.productRepository.delete(id);

    if (affected !== 1) {
      throw new BadRequestException();
    }
    return `The product id: ${id} has been deleted`;
  }
}
