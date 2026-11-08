'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImageToStorage } from '@/lib/firebase/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  disabled?: boolean;
  maxSizeMB?: number;
}

export function ImageUpload({
  value = '',
  onChange,
  folder = 'uploads',
  label = 'Upload Photo',
  disabled = false,
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds maximum limit of ${maxSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const downloadUrl = await uploadImageToStorage(file, {
        folder,
        maxSizeMB,
        onProgress: (p) => setUploadProgress(p),
      });

      onChange(downloadUrl);
      toast.success('Photo uploaded successfully to Cloud Storage');
    } catch (err: unknown) {
      console.error('Upload failed:', err);
      const msg = (err as Error)?.message || 'Failed to upload photo';
      toast.error(msg);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#2f6bff] hover:underline flex items-center gap-1 font-medium"
        >
          {showUrlInput ? (
            <>
              <UploadCloud className="h-3 w-3" /> Upload from device
            </>
          ) : (
            <>
              <LinkIcon className="h-3 w-3" /> Enter URL manually
            </>
          )}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/photo.jpg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="flex-1 text-sm bg-white"
          />
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear
            </Button>
          )}
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
            className="hidden"
            id={`file-upload-${folder}`}
          />

          {value ? (
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-3 flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 shadow-xs">
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {value.split('/').pop()?.split('?')[0] || 'Image uploaded'}
                </p>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  ✓ Uploaded & Synced
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
                className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
              >
                <X className="h-4 w-4 mr-1" /> Remove
              </Button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`group relative rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#2f6bff] p-6 text-center cursor-pointer transition-all duration-200 bg-slate-50/50 hover:bg-[#2f6bff]/5 ${
                disabled || isUploading ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              {isUploading ? (
                <div className="space-y-3 max-w-xs mx-auto">
                  <div className="h-10 w-10 mx-auto rounded-xl bg-[#2f6bff]/10 text-[#2f6bff] flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Uploading to Cloud Storage... {uploadProgress}%
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-[#2f6bff] h-1.5 rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-[#2f6bff]/10 group-hover:text-[#2f6bff] transition-colors">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Click to choose photo from device
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Supports PNG, JPG, or WebP up to {maxSizeMB}MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
