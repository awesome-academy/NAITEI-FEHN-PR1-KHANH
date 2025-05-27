import type { Address } from '../../interfaces/Address'

interface AddressCardProps {
  address: Address
  onEdit: (address: Address) => void
  onDelete: (addressId: string) => void
}

const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
  return (
    <div className='border border-gray-200 p-6 bg-white'>
      <div className='space-y-4'>
        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Tên</span>
          <div className='px-3 py-2 bg-gray-50'>{address.firstName}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Họ & tên đệm</span>
          <div className='px-3 py-2 bg-gray-50'>{address.lastName}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Công ty</span>
          <div className='px-3 py-2 bg-gray-50'>{address.company ?? ''}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Địa chỉ</span>
          <div className='px-3 py-2 bg-gray-50'>{address.address}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Thành phố</span>
          <div className='px-3 py-2 bg-gray-50'>{address.city}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Quốc Tịch</span>
          <div className='px-3 py-2 bg-gray-50'>{address.country}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Postal/Zip Code</span>
          <div className='px-3 py-2 bg-gray-50'>{address.postalCode}</div>
        </div>

        <div className='grid grid-cols-[120px_1fr] gap-4 items-center'>
          <span className='text-gray-700'>Phone</span>
          <div className='px-3 py-2 bg-gray-50'>{address.phone}</div>
        </div>

        {address.isDefault && <div className='text-green-600 font-medium'>✓ Địa chỉ mặc định</div>}

        <div className='flex space-x-2 pt-4'>
          <button
            onClick={() => onEdit(address)}
            className='bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 text-sm font-bold transition-colors'
          >
            Chỉnh sửa địa chỉ
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm font-bold transition-colors'
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddressCard
