import { ListObjectsCommandOutput, PutObjectCommandOutput, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { Readable } from 'stream';

export interface IStorage {
  getObjects: () => Promise<ListObjectsCommandOutput>;
  createObject: (
    key: string,
    body: string | Readable | Blob | Uint8Array | Buffer,
    contentType?: string
  ) => Promise<PutObjectCommandOutput>;
  getObject: (key: string) => Promise<GetObjectCommandOutput>;
}
