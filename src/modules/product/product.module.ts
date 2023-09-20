import { Module } from "@nestjs/common";
import { ProductService } from "./aplication/product.service";
import { ProductController } from "./controllers/product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./infrastucture/entities/product.entity";
import { PRODUCT_REPOSITORY } from "./aplication/repository/product.repositorio";
import { ProductMysqlRepository } from "./infrastucture/product.mysql.repository";
import { MapperProduct } from "./aplication/mappers/mappers.product";
import { CATEGORY_REPOSITORY } from "../category/aplication/repository/category.repository";
import { CategoryMysqlRepository } from "../category/infrastructure/category.mysql.repository";
import { MapperCategory } from "../category/aplication/mappers/mapperCategory";
import { CategoryEntity } from "../category/infrastructure/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    MapperCategory,
    MapperProduct,
    { provide: PRODUCT_REPOSITORY, useClass: ProductMysqlRepository },
    { provide: CATEGORY_REPOSITORY, useClass: CategoryMysqlRepository },
  ],
  exports: [ProductService],
})
export class ProductModule {}
