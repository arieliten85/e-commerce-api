import { Module } from "@nestjs/common";
import { CategoryService } from "./aplication/category.service";
import { CategoryController } from "./controllers/category.controller";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
