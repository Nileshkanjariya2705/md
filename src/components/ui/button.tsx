import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 outline-none select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-[#2f6bff] to-[#4f8aff] hover:from-[#2557d6] hover:to-[#3e78f0] text-white shadow-sm hover:shadow-[0_8px_24px_rgba(47,107,255,0.28)] hover:-translate-y-0.5 transition-all',
        primary:
          'bg-[#2f6bff] hover:bg-[#2052d9] text-white shadow-sm hover:shadow-[0_8px_24px_rgba(47,107,255,0.28)] hover:-translate-y-0.5 transition-all',
        gradient:
          'bg-gradient-to-r from-[#2f6bff] via-[#3d7eff] to-[#19c3d8] hover:opacity-95 text-white shadow-sm hover:shadow-[0_8px_24px_rgba(47,107,255,0.3)] hover:-translate-y-0.5 transition-all',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 transition-all',
        outline:
          'border border-slate-200 bg-white text-slate-700 hover:text-[#2f6bff] hover:border-[#2f6bff]/40 hover:bg-slate-50/80 transition-all',
        ghost:
          'text-slate-600 hover:text-[#2f6bff] hover:bg-slate-100/80 transition-all',
        destructive:
          'bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition-all',
        link:
          'text-[#2f6bff] underline-offset-4 hover:underline p-0 h-auto font-medium rounded-none',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 text-xs font-semibold',
        lg: 'h-12 px-8 text-sm sm:text-base font-bold',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const finalClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<{ className?: string; ref?: React.Ref<unknown> }>;
      const restProps = { ...props };
      delete restProps.children;
      return React.cloneElement(child, {
        ...restProps,
        className: cn(finalClassName, child.props?.className),
        ref,
      });
    }

    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
