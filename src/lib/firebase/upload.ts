import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirebaseStorage } from './storage';

export interface UploadOptions {
  folder?: string;
  maxSizeMB?: number;
  onProgress?: (progress: number) => void;
}

/**
 * Uploads a file directly to Firebase Storage with progress tracking.
 * Returns the permanent, public HTTPS download URL.
 */
export function uploadImageToStorage(
  file: File,
  options: UploadOptions = {}
): Promise<string> {
  const { folder = 'uploads', maxSizeMB = 5, onProgress } = options;

  if (file.size > maxSizeMB * 1024 * 1024) {
    return Promise.reject(
      new Error(`File size exceeds maximum limit of ${maxSizeMB}MB`)
    );
  }

  if (!file.type.startsWith('image/')) {
    return Promise.reject(new Error('Only image files (JPEG, PNG, WebP, GIF) are permitted'));
  }

  return new Promise((resolve, reject) => {
    try {
      const storage = getFirebaseStorage();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniquePath = `${folder}/${Date.now()}_${sanitizedName}`;
      const storageRef = ref(storage, uniquePath);

      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            if (onProgress) {
              onProgress(progress);
            }
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (err) {
            reject(err);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}
