import { useState, useCallback } from 'react';

interface UploadFile {
  fileName: string;
  fileType: string;
  fileSize: number;
}

interface UploadResult {
  originalFileName: string;
  uploadUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  error?: string;
}

interface BatchUploadResponse {
  success: boolean;
  data?: {
    uploads: UploadResult[];
    expiresIn: number;
    totalFiles: number;
    successCount: number;
    errorCount: number;
  };
  message?: string;
}

interface SingleUploadResponse {
  success: boolean;
  data?: {
    uploadUrl: string;
    fileUrl: string;
    fileName: string;
    expiresIn: number;
  };
  message?: string;
}

interface FileListResponse {
  success: boolean;
  data?: {
    files: Array<{
      fileName: string;
      displayName: string;
      size: number;
      lastModified: string;
      etag: string;
      url: string;
      signedUrl?: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message?: string;
}

export const useS3Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  // 单文件上传
  const uploadSingleFile = useCallback(async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);
    
    try {
      // 1. 获取预签名URL
      const uploadData: UploadFile = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      };

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      const result: SingleUploadResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || '获取上传URL失败');
      }

      // 2. 上传文件到S3
      const uploadResponse = await fetch(result.data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('文件上传失败');
      }

      return result.data.fileUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '上传失败';
      setError(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  // 批量文件上传
  const uploadMultipleFiles = useCallback(async (files: File[]): Promise<UploadResult[]> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress({});
    
    try {
      // 1. 获取所有文件的预签名URL
      const uploadData = {
        files: files.map(file => ({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        })),
      };

      const response = await fetch('/api/upload/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });

      const result: BatchUploadResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.message || '获取上传URL失败');
      }

      // 2. 并发上传所有文件
      const uploadPromises = result.data.uploads.map(async (uploadInfo, index) => {
        if (uploadInfo.error || !uploadInfo.uploadUrl) {
          return uploadInfo;
        }

        const file = files[index];
        const fileKey = `${file.name}-${index}`;
        
        try {
          setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }));
          
          const uploadResponse = await fetch(uploadInfo.uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });

          if (!uploadResponse.ok) {
            throw new Error('文件上传失败');
          }

          setUploadProgress(prev => ({ ...prev, [fileKey]: 100 }));
          return uploadInfo;
        } catch (err) {
          setUploadProgress(prev => ({ ...prev, [fileKey]: -1 })); // -1 表示失败
          return {
            ...uploadInfo,
            error: err instanceof Error ? err.message : '上传失败',
          };
        }
      });

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '批量上传失败';
      setError(errorMessage);
      return [];
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  }, []);

  // 获取文件列表
  const getFileList = useCallback(async (params?: {
    page?: number;
    limit?: number;
    prefix?: string;
  }): Promise<FileListResponse['data'] | null> => {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.prefix) searchParams.set('prefix', params.prefix);

      const response = await fetch(`/api/upload/files?${searchParams.toString()}`);
      const result: FileListResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message || '获取文件列表失败');
      }

      return result.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取文件列表失败';
      setError(errorMessage);
      return null;
    }
  }, []);

  // 删除单个文件
  const deleteFile = useCallback(async (fileName: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || '删除文件失败');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '删除文件失败';
      setError(errorMessage);
      return false;
    }
  }, []);

  // 批量删除文件
  const deleteMultipleFiles = useCallback(async (fileNames: string[]): Promise<boolean> => {
    try {
      const response = await fetch('/api/upload/batch', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileNames }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || '批量删除文件失败');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '批量删除文件失败';
      setError(errorMessage);
      return false;
    }
  }, []);

  // 获取文件下载URL
  const getDownloadUrl = useCallback(async (fileName: string): Promise<string | null> => {
    try {
      const response = await fetch(`/api/upload?fileName=${encodeURIComponent(fileName)}`);
      const result = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.message || '获取下载链接失败');
      }

      return result.data.downloadUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '获取下载链接失败';
      setError(errorMessage);
      return null;
    }
  }, []);

  return {
    // 状态
    isUploading,
    uploadProgress,
    error,
    
    // 方法
    uploadSingleFile,
    uploadMultipleFiles,
    getFileList,
    deleteFile,
    deleteMultipleFiles,
    getDownloadUrl,
    
    // 工具方法
    clearError: () => setError(null),
  };
};

export default useS3Upload;