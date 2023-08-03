import { join } from 'node:path';
import { createReadStream } from 'node:fs';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
  const key = params.key;
  const filePath = join('uploads', key);

  const fileStream = createReadStream(filePath) as unknown as ReadableStream;

  return new Response(fileStream);
}) satisfies RequestHandler;
