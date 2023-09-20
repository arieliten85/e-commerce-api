import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { ImagesFsRepository } from "../aplication/repository/images.fs.repository";

@Injectable()
export class ImagesStorageFsRepository implements ImagesFsRepository {
  async create(buffer: Buffer, originalName: string): Promise<string> {
    const outputPath = path.join("upload-images");

    const fileName = `${uuidv4()}_${path.basename(originalName)}`;
    const filePath = path.join(outputPath, fileName);

    await fs.writeFile(filePath, buffer);

    return filePath.toString();
  }

  async delete(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
}
