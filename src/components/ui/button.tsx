import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm hover:shadow-md transition-all',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 hover:border-slate-300',
        outline:
          'border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400',
        ghost:
          'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
        destructive:
          'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
        link:
          'text-teal-600 underline-offset-4 hover:underline p-0 h-auto font-normal',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 rounded-lg px-3.5 text-xs',
        lg: 'h-12 rounded-2xl px-7 text-base font-bold',
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
      const child = props.children as React.ReactElement<any>;
      const { children: _children, ...restProps } = props;
      // We manually merge classes and spread other props to the child
      return React.cloneElement(child, {
        ...restProps,
        className: cn(finalClassName, child.props?.className),
        // @ts-ignore
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
