import { type InputHTMLAttributes, forwardRef } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...props }, ref) => {
  return (
    <div className='mb-4'>
      <label className='flex items-center'>
        <input ref={ref} type='checkbox' className={`mr-2 ${className ?? ''}`} {...props} />
        {label && <span className='text-gray-700'>{label}</span>}
      </label>
    </div>
  )
})

export default Checkbox
