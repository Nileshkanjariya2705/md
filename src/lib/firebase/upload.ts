import { uploadImage, UploadProgressOptions } from '../upload';

export type UploadOptions = UploadProgressOptions;

/**
 * Uploads an image to cloud storage (Cloudinary) with real-time progress.
 * Maintained for backward compatibility with existing imports.
 */
export async function uploadImageToStorage(
  file: File,
  options: UploadOptions = {}
): Promise<string> {
  return uploadImage(file, options);
}
