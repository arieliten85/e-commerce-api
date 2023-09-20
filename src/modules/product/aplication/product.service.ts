import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { CreateProductDto } from "../controllers/dto/create-product.dto";
import { UpdateProductDto } from "../controllers/dto/update-product.dto";
import { ProductMysqlRepository } from "../infrastucture/product.mysql.repository";
import { PRODUCT_REPOSITORY } from "./repository/product.repositorio";
import { MapperProduct } from "./mappers/mappers.product";
import { Product } from "../dominio/producto.domain";
import { CATEGORY_REPOSITORY } from "src/modules/category/aplication/repository/category.repository";
import { CategoryMysqlRepository } from "src/modules/category/infrastructure/category.mysql.repository";

const MESSAGE_ERROR = {
  PRODUCT_NOT_FOUND: "Product not found.",
  PRODUCT_NOT_DELETE: "Opps, the product dont has been deleted.",

  CATEGORY_NOT_FOUND: "Category not found.",
};

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductMysqlRepository,

    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryMysqlRepository,

    private readonly mapperProduct: MapperProduct,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productClass: Product =
      this.mapperProduct.dtoToClass(createProductDto);

    const categoryFound = await this.categoryRepository.findOne(
      createProductDto.category_id,
    );

    if (!categoryFound) {
      throw new BadRequestException(MESSAGE_ERROR.CATEGORY_NOT_FOUND);
    }
    productClass.category = categoryFound;
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
      throw new BadRequestException(MESSAGE_ERROR.PRODUCT_NOT_DELETE);
    }
    return `The product id: ${id} has been deleted`;
  }
}
