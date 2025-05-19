import { useState, type InputHTMLAttributes, forwardRef } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
  showToggle?: boolean
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, required, showToggle = false, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const id = props.id ?? props.name

    return (
      <div className='mb-4'>
        {label && (
          <label htmlFor={id} className='block text-gray-700 mb-2'>
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div className='relative'>
          <input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            className={`w-full border ${
              error ? 'border-red-500' : 'border-gray-300'
            } px-3 py-2 focus:outline-none focus:border-yellow-500 ${showToggle ? 'pr-10' : ''} ${className ?? ''}`}
            {...props}
          />
          {showToggle && (
            <button
              type='button'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          )}
        </div>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    )
  }
)

export default PasswordInput
