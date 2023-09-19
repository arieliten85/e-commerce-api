import { Module } from "@nestjs/common";
import { ProductService } from "./aplication/product.service";
import { ProductController } from "./controllers/product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./infrastucture/entities/product.entity";
import { PRODUCT_REPOSITORY } from "./aplication/repository/product.repositorio";
import { ProductMysqlRepository } from "./infrastucture/product.mysql";
import { MapperProduct } from "./aplication/mappers/mappers.product";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    ProductService,
    MapperProduct,
    { provide: PRODUCT_REPOSITORY, useClass: ProductMysqlRepository },
  ],
  exports: [MapperProduct],
})
export class ProductModule {}
