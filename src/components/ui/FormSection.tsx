import type React from 'react'
import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-medium text-gray-800 uppercase mb-6'>{title}</h2>
      {children}
    </div>
  )
}

export default FormSection
