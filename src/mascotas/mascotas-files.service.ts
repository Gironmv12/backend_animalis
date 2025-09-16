import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Request } from '@nestjs/common';
@Injectable()
export class MascotasFilesService {
  private bucket: GridFSBucket;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.bucket = new GridFSBucket(this.connection.db!, {
      bucketName: 'mascotas',
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<ObjectId> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });
      uploadStream.end(file.buffer);
      uploadStream.on('finish', () => resolve(uploadStream.id));
      uploadStream.on('error', reject);
    });
  }

  getFileStream(id: string) {
    return this.bucket.openDownloadStream(new ObjectId(id));
  }
}
