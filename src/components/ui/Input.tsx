import { type InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, required, className, ...props }, ref) => {
  const id = props.id ?? props.name

  return (
    <div className='mb-4'>
      {label && (
        <label htmlFor={id} className='block text-gray-700 mb-2'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } px-3 py-2 focus:outline-none focus:border-yellow-500 ${className ?? ''}`}
        {...props}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  )
})

export default Input
