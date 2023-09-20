import { CategoryEntity } from "src/modules/category/infrastructure/entities/category.entity";
import { ImagesEntity } from "src/modules/images/infrastruture/entities/images.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("product")
export class ProductEntity {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @OneToMany(() => ImagesEntity, (images) => images.product, { cascade: true })
  images?: ImagesEntity[];

  @JoinColumn({ name: "category_id" })
  @ManyToOne(() => CategoryEntity, (category) => category.product, {
    cascade: true,
  })
  category?: CategoryEntity;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
