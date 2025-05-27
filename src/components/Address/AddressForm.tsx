import React from 'react'
import type { AddressFormData } from '../../interfaces/Address'
import AddressFormField from './AddressFormField'
import { CITIES, COUNTRIES } from '../../constants/address'

interface AddressFormProps {
  data: AddressFormData
  setData: (data: AddressFormData) => void
  onSave: () => void
  saveButtonText: string
  onCancel: () => void
  errors?: Record<string, string>
}

const AddressForm: React.FC<AddressFormProps> = ({ data, setData, onSave, saveButtonText, onCancel, errors = {} }) => {
  return (
    <div className='border border-gray-200 p-6 bg-white'>
      <div className='space-y-4'>
        <AddressFormField label='Tên' field='firstName' data={data} setData={setData} errors={errors} />
        <AddressFormField label='Họ & tên đệm' field='lastName' data={data} setData={setData} errors={errors} />
        <AddressFormField label='Công ty' field='company' data={data} setData={setData} errors={errors} />
        <AddressFormField label='Địa chỉ' field='address' data={data} setData={setData} errors={errors} />
        <AddressFormField
          label='Thành phố'
          field='city'
          data={data}
          setData={setData}
          type='select'
          errors={errors}
          options={CITIES}
        />
        <AddressFormField
          label='Quốc Tịch'
          field='country'
          data={data}
          setData={setData}
          type='select'
          errors={errors}
          options={COUNTRIES}
        />
        <AddressFormField label='Postal/Zip Code' field='postalCode' data={data} setData={setData} errors={errors} />
        <AddressFormField label='Phone' field='phone' data={data} setData={setData} errors={errors} />

        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            id='default-checkbox'
            checked={data.isDefault}
            onChange={(e) => setData({ ...data, isDefault: e.target.checked })}
            className='mr-2'
          />
          <label htmlFor='default-checkbox' className='text-gray-700'>
            Đặt làm địa chỉ mặc định?
          </label>
        </div>

        <div className='flex space-x-2 pt-4'>
          <button
            type='button'
            onClick={onSave}
            className='bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 text-sm font-bold transition-colors'
          >
            {saveButtonText}
          </button>
          <button
            type='button'
            onClick={onCancel}
            className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm font-bold transition-colors'
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddressForm
