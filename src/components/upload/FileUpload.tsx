'use client';

import React, { useState, useRef } from 'react';
import { useS3Upload } from '@/hooks/useS3Upload';

interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // 单位：字节
  onUploadComplete?: (fileUrls: string[]) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 默认10MB
  onUploadComplete,
  onUploadError,
  className = '',
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    isUploading,
    uploadProgress,
    error,
    uploadSingleFile,
    uploadMultipleFiles,
    clearError,
  } = useS3Upload();

  // 文件选择处理
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // 验证文件大小
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        onUploadError?.(`文件 ${file.name} 超过大小限制 ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(validFiles);
    clearError();
  };

  // 拖拽处理
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = Array.from(event.dataTransfer.files);
    
    // 验证文件大小
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        onUploadError?.(`文件 ${file.name} 超过大小限制 ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
        return false;
      }
      return true;
    });
    
    if (!multiple && validFiles.length > 1) {
      onUploadError?.('只能选择一个文件');
      return;
    }
    
    setSelectedFiles(validFiles);
    clearError();
  };

  // 上传文件
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      onUploadError?.('请先选择文件');
      return;
    }

    try {
      let results: string[] = [];
      
      if (multiple) {
        // 批量上传
        const uploadResults = await uploadMultipleFiles(selectedFiles);
        results = uploadResults
          .filter(result => !result.error && result.fileUrl)
          .map(result => result.fileUrl!);
      } else {
        // 单文件上传
        const result = await uploadSingleFile(selectedFiles[0]);
        if (result) {
          results = [result];
        }
      }
      
      if (results.length > 0) {
        setUploadedFiles(prev => [...prev, ...results]);
        onUploadComplete?.(results);
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      onUploadError?.(err instanceof Error ? err.message : '上传失败');
    }
  };

  // 移除选中的文件
  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 清空选择
  const clearSelection = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`file-upload ${className}`}>
      {/* 拖拽上传区域 */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-2">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
              点击选择文件
            </span>
            {' 或拖拽文件到此处'}
          </div>
          <p className="text-xs text-gray-500">
            {multiple ? '支持多文件上传' : '单文件上传'} • 最大 {(maxSize / 1024 / 1024).toFixed(1)}MB
          </p>
        </div>
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 选中的文件列表 */}
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">
              已选择 {selectedFiles.length} 个文件
            </h4>
            <button
              onClick={clearSelection}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              清空
            </button>
          </div>
          
          <div className="space-y-2">
            {selectedFiles.map((file, index) => {
              const fileKey = `${file.name}-${index}`;
              const progress = uploadProgress[fileKey];
              
              return (
                <div key={fileKey} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    
                    {/* 上传进度条 */}
                    {typeof progress === 'number' && progress >= 0 && (
                      <div className="mt-1">
                        <div className="bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full transition-all ${
                              progress === 100 ? 'bg-green-500' : progress === -1 ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {progress === 100 ? '上传完成' : progress === -1 ? '上传失败' : `${progress}%`}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {!isUploading && (
                    <button
                      onClick={() => removeSelectedFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* 上传按钮 */}
          <div className="mt-4">
            <button
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? '上传中...' : `上传 ${selectedFiles.length} 个文件`}
            </button>
          </div>
        </div>
      )}

      {/* 错误信息 */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* 已上传文件列表 */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            已上传的文件 ({uploadedFiles.length})
          </h4>
          <div className="space-y-1">
            {uploadedFiles.map((fileUrl, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm text-green-700 truncate">
                  {fileUrl.split('/').pop()}
                </span>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  查看
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;