// https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint
// https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#examples

//import { imageStorageConfig } from "./config";
import { Result } from './types/result';

export async function uploadImage(name: string, image: File): Promise<Result> {
  return {
    isError: true,
    message: name + image.type,
  };
}
