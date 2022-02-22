import ImageKit from 'imagekit';
import { imageStorageConfig } from '../../../lib/config';

export default function handler(req: any, res: any): void {
  const imagekit = new ImageKit({
    publicKey: imageStorageConfig.PUBLIC_KEY,
    privateKey: process.env.IMAGE_STORAGE_PRIVATE_KEY,
    urlEndpoint: imageStorageConfig.ENDPOINT,
  });

  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.status(200).json(authenticationParameters);
}
