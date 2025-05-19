import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, className, type = 'button', ...props }, ref) => {
    const baseStyles = 'px-6 py-2 uppercase font-bold text-sm transition-colors'

    const variantStyles = {
      primary: 'bg-black text-white hover:bg-yellow-600 disabled:bg-gray-400',
      secondary: 'bg-black text-white hover:bg-gray-700 disabled:bg-gray-400'
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isLoading || props.disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${className ?? ''}`}
        {...props}
      >
        {isLoading ? 'Đang xử lý...' : children}
      </button>
    )
  }
)

export default Button
