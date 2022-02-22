// https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint
// https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#examples

import ImageKit from 'imagekit-javascript';
import { UploadResponse } from 'imagekit-javascript/dist/src/interfaces';
import { imageStorageConfig } from './config';
import { Result } from './types/result';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET);

export async function uploadContent(content: File): Promise<Result> {
  try {
    const result = (await uploadToImageKit(content.name, content)) as UploadResponse;
    return Result.ok('Content uploaded', result.url);
  } catch (error) {
    Result.fail(`Error: ${error.message}`);
  }
}

export async function uploadJsonMetadata(id: string, text: string, contentUrl: string): Promise<Result> {
  try {
    const fileBody = Buffer.from(
      JSON.stringify({
        text: text,
        content: contentUrl,
      }),
    );
    const { data, error } = await supabase.storage.from('metadata').upload(`${id}.json`, fileBody, {
      contentType: 'application/json',
    });
    if (error) {
      return Result.fail(`Error: ${error.message}`);
    }
    return Result.ok('Content uploaded', data.Key);
  } catch (err) {
    Result.fail(`Error: ${err.message}`);
  }
}

function uploadToImageKit(name: string, content: File) {
  const imagekit = new ImageKit({
    publicKey: imageStorageConfig.PUBLIC_KEY,
    urlEndpoint: imageStorageConfig.ENDPOINT,
    authenticationEndpoint: imageStorageConfig.SERVER_AUTH_URL,
  });

  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: content,
        fileName: name,
        useUniqueFileName: true,
      },
      function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  });
}
