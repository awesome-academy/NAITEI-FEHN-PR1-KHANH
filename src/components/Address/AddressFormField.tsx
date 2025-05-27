import React from 'react'
import type { AddressFormData } from '../../interfaces/Address'

interface AddressFormFieldProps {
  label: string
  field: keyof AddressFormData
  data: AddressFormData
  setData: (data: AddressFormData) => void
  type?: 'input' | 'select'
  options?: string[]
  errors?: Record<string, string>
}

const AddressFormField: React.FC<AddressFormFieldProps> = ({
  label,
  field,
  data,
  setData,
  type = 'input',
  options,
  errors = {}
}) => {
  return (
    <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
      <label className='text-gray-700'>{label}</label>
      <div>
        {type === 'select' ? (
          <select
            value={data[field] as string}
            onChange={(e) => setData({ ...data, [field]: e.target.value })}
            className='w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-yellow-500'
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type='text'
            value={data[field] as string}
            onChange={(e) => setData({ ...data, [field]: e.target.value })}
            className={`w-full border px-3 py-2 focus:outline-none focus:border-yellow-500 ${
              errors[field] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
        {errors[field] && <p className='text-red-500 text-sm mt-1'>{errors[field]}</p>}
      </div>
    </div>
  )
}

export default AddressFormField
