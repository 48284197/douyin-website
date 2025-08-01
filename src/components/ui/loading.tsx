import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size = 'md', variant = 'spinner', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6', 
      lg: 'w-8 h-8'
    };

    if (variant === 'spinner') {
      return (
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
            sizeClasses[size],
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }

    if (variant === 'dots') {
      return (
        <div
          className={cn('flex space-x-1', className)}
          ref={ref}
          {...props}
        >
          <div className={cn('animate-bounce rounded-full bg-blue-600', size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4')} style={{ animationDelay: '0ms' }} />
          <div className={cn('animate-bounce rounded-full bg-blue-600', size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4')} style={{ animationDelay: '150ms' }} />
          <div className={cn('animate-bounce rounded-full bg-blue-600', size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4')} style={{ animationDelay: '300ms' }} />
        </div>
      );
    }

    if (variant === 'pulse') {
      return (
        <div
          className={cn(
            'animate-pulse rounded bg-gray-300',
            sizeClasses[size],
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }

    return null;
  }
);
Loading.displayName = 'Loading';

export { Loading };