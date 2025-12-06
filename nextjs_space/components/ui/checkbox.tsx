import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  id?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, className, disabled, id }, ref) => {
    return (
      <button
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          'h-5 w-5 rounded border-2 border-gray-300 flex items-center justify-center transition-colors',
          checked && 'bg-teal-600 border-teal-600',
          !disabled && 'hover:border-teal-500',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        ref={ref}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </button>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
