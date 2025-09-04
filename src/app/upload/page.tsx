'use client';

import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/upload/FileUpload';
import { useS3Upload } from '@/hooks/useS3Upload';
import { NavigationWithAuth } from '@/components/layout/navigation-with-auth';

interface FileInfo {
  fileName: string;
  displayName: string;
  size: number;
  lastModified: string;
  etag: string;
  url: string;
  signedUrl?: string;
}

const UploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [fileList, setFileList] = useState<FileInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
  const {
    getFileList,
    deleteFile,
    deleteMultipleFiles,
    getDownloadUrl,
    error,
    clearError,
  } = useS3Upload();

  // 加载文件列表
  const loadFileList = async (page: number = 1) => {
    setLoading(true);
    try {
      const result = await getFileList({ page, limit: 10 });
      if (result) {
        setFileList(result.files);
        setCurrentPage(result.pagination.page);
        setTotalPages(result.pagination.totalPages);
      }
    } catch (err) {
      console.error('加载文件列表失败:', err);
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时获取文件列表
  useEffect(() => {
    loadFileList();
  }, []);

  // 上传完成处理
  const handleUploadComplete = (fileUrls: string[]) => {
    setUploadedFiles(prev => [...prev, ...fileUrls]);
    // 重新加载文件列表
    loadFileList(currentPage);
  };

  // 上传错误处理
  const handleUploadError = (errorMessage: string) => {
    console.error('上传错误:', errorMessage);
  };

  // 删除单个文件
  const handleDeleteFile = async (fileName: string) => {
    if (!confirm('确定要删除这个文件吗？')) {
      return;
    }
    
    const success = await deleteFile(fileName);
    if (success) {
      loadFileList(currentPage);
    }
  };

  // 批量删除文件
  const handleBatchDelete = async () => {
    if (selectedFiles.length === 0) {
      alert('请先选择要删除的文件');
      return;
    }
    
    if (!confirm(`确定要删除选中的 ${selectedFiles.length} 个文件吗？`)) {
      return;
    }
    
    const success = await deleteMultipleFiles(selectedFiles);
    if (success) {
      setSelectedFiles([]);
      loadFileList(currentPage);
    }
  };

  // 下载文件
  const handleDownloadFile = async (fileName: string) => {
    const downloadUrl = await getDownloadUrl(fileName);
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  // 切换文件选择
  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName)
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedFiles.length === fileList.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(fileList.map(f => f.fileName));
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

  // 格式化日期
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationWithAuth />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">文件上传管理</h1>
        
        {/* 上传区域 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">上传文件</h2>
          <FileUpload
            multiple={true}
            accept="*/*"
            maxSize={10 * 1024 * 1024} // 10MB
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 文件列表 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">我的文件</h2>
              <div className="flex items-center space-x-2">
                {selectedFiles.length > 0 && (
                  <button
                    onClick={handleBatchDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    删除选中 ({selectedFiles.length})
                  </button>
                )}
                <button
                  onClick={() => loadFileList(currentPage)}
                  disabled={loading}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? '加载中...' : '刷新'}
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">加载中...</p>
            </div>
          ) : fileList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="mt-2">暂无文件</p>
            </div>
          ) : (
            <>
              {/* 文件表格 */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedFiles.length === fileList.length && fileList.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        文件名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        大小
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        修改时间
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fileList.map((file) => (
                      <tr key={file.fileName} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.fileName)}
                            onChange={() => toggleFileSelection(file.fileName)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {file.displayName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(file.lastModified)}
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button
                            onClick={() => handleDownloadFile(file.fileName)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            下载
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file.fileName)}
                            className="text-red-600 hover:text-red-800"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      第 {currentPage} 页，共 {totalPages} 页
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => loadFileList(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                      >
                        上一页
                      </button>
                      <button
                        onClick={() => loadFileList(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                      >
                        下一页
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default UploadPage;