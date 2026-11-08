export interface UploadProgressOptions {
  folder?: string;
  maxSizeMB?: number;
  onProgress?: (progress: number) => void;
}

/**
 * Uploads an image file to Cloudinary via the server-side API route (/api/upload).
 * Supports real-time upload progress tracking using XMLHttpRequest.
 * Returns the public HTTPS URL from Cloudinary.
 */
export function uploadImage(
  file: File,
  options: UploadProgressOptions = {}
): Promise<string> {
  const { folder = 'magnovaa', maxSizeMB = 10, onProgress } = options;

  if (file.size > maxSizeMB * 1024 * 1024) {
    return Promise.reject(new Error(`File size exceeds limit of ${maxSizeMB}MB`));
  }

  if (!file.type.startsWith('image/')) {
    return Promise.reject(new Error('Only image files (JPEG, PNG, WebP, GIF) are permitted'));
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.url) {
            resolve(response.url);
          } else {
            reject(new Error(response.error || 'Upload failed'));
          }
        } catch {
          reject(new Error('Invalid response received from upload server'));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error || `Upload failed with status ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error occurred during image upload'));
    };

    xhr.open('POST', '/api/upload', true);
    xhr.send(formData);
  });
}

// Backward-compatible alias
export const uploadImageToStorage = uploadImage;
