'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IdeaFormData, ideaSchema } from '@/lib/validations';
import { IDEA_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';
import { Loading } from '@/components/ui/loading';
import { RichTextEditor, type RichTextEditorRef } from '@/components/ui/rich-text-editor';
import { TagsInput } from '@/components/ui/tags-input';

type FormData = {
  title: string;
  description: string;
  category: string;
  contactEmail?: string;
};

export function IdeaSubmissionForm() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status || 'loading';
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [useRichEditor, setUseRichEditor] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const richEditorRef = useRef<RichTextEditorRef>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      contactEmail: '',
    },
  });

  // 当 session 加载完成后，设置默认邮箱
  useEffect(() => {
    if (session?.user?.email) {
      setValue('contactEmail', session.user.email);
    }
  }, [session, setValue]);

  // 如果正在加载 session，显示加载状态
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-8">
        <Loading size="md" />
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // 如果使用富文本编辑器，获取其内容
    const finalDescription = useRichEditor 
      ? richEditorRef.current?.getContent() || description
      : data.description;

    // 验证数据
    const validationResult = ideaSchema.safeParse({
      ...data,
      description: finalDescription,
      tags,
    });

    if (!validationResult.success) {
      setSubmitError('请检查输入的数据是否正确');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationResult.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || '提交失败，请重试');
      }

      setSubmitSuccess(true);
      reset();
      setDescription('');
      setTags([]);
      if (useRichEditor) {
        richEditorRef.current?.setContent('');
      }
      
      // 3秒后跳转到想法列表页面
      setTimeout(() => {
        router.push('/ideas/list');
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h2>
        <p className="text-gray-600 mb-4">
          感谢您的宝贵建议，我们会认真考虑您的想法。
        </p>
        <p className="text-sm text-gray-500">
          正在跳转到想法列表页面...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <Alert variant="destructive">
          {submitError}
        </Alert>
      )}

      <div>
        <Label htmlFor="title">想法标题 *</Label>
        <Input
          id="title"
          type="text"
          placeholder="请简要描述您的想法"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category">分类 *</Label>
        <select
          id="category"
          {...register('category')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">请选择分类</option>
          {IDEA_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="description">详细描述 *</Label>
          <div className="flex items-center space-x-2">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={useRichEditor}
                onChange={(e) => setUseRichEditor(e.target.checked)}
                className="mr-1"
              />
              使用富文本编辑器
            </label>
          </div>
        </div>
        
        {useRichEditor ? (
          <div>
            <RichTextEditor
              ref={richEditorRef}
              placeholder="请详细描述您的想法，包括具体的使用场景和期望的功能..."
              content={description}
              onChange={setDescription}
              error={!!errors.description}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        ) : (
          <div>
            <Textarea
              id="description"
              placeholder="请详细描述您的想法，包括具体的使用场景和期望的功能..."
              rows={8}
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        )}
        
        <p className="mt-1 text-sm text-gray-500">
          最少20个字符，最多2000个字符
        </p>
      </div>

      <div>
        <Label htmlFor="tags">标签</Label>
        <TagsInput
          tags={tags}
          onChange={setTags}
          placeholder="添加相关标签，用回车或逗号分隔"
          maxTags={10}
        />
        <p className="mt-1 text-sm text-gray-500">
          最多添加10个标签，每个标签最多20个字符
        </p>
      </div>

      <div>
        <Label htmlFor="contactEmail">联系邮箱</Label>
        <Input
          id="contactEmail"
          type="email"
          placeholder="如需回复，请留下您的邮箱"
          {...register('contactEmail')}
          className={errors.contactEmail ? 'border-red-500' : ''}
        />
        {errors.contactEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {session?.user?.email ? '已自动填入您的账户邮箱' : '可选，用于接收回复'}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-500">
          * 为必填项
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? <Loading size="sm" /> : '提交想法'}
        </Button>
      </div>
    </form>
  );
}