import { env } from 'node:process';
import { z } from 'zod';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import type { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import promise from '$lib/utils/promise';

const constants = z
  .object({
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    S3_REGION: z.string(),
    S3_BUCKET: z.string(),
    S3_DIRECTORY: z.string(),
  })
  .parse(env);
const accessKeyId = constants.AWS_ACCESS_KEY_ID;
const secretAccessKey = constants.AWS_SECRET_ACCESS_KEY;
const region = constants.S3_REGION;
const Bucket = constants.S3_BUCKET;
const directory = constants.S3_DIRECTORY;

export async function store(file: File) {
  const client = getClient();

  const upload = new Upload({
    client,
    params: {
      ACL: 'public-read',
      Bucket,
      Key: `${directory}/${Date.now()}-${file.name}`,
      Body: file,
    },
  });

  const uploadPromise = await promise<CompleteMultipartUploadCommandOutput>(
    () => upload.done(),
    true,
  );

  if (uploadPromise.success && uploadPromise.data.Location) {
    return uploadPromise.data.Location;
  }
}

export async function destroy(key: string) {
  const client = getClient();

  key = decodeURIComponent(key.slice(key.indexOf('.com') + 5));
  const command = new DeleteObjectCommand({
    Bucket,
    Key: key,
  });

  await promise(() => client.send(command), true);
}

export class SThree {
  store = store;
  destroy = destroy;
}

export const sThree = new SThree();

function getClient() {
  return new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });
}
