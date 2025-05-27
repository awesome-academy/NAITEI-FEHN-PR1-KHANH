import type { Address, AddressFormData } from '../../interfaces/Address'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm'

interface AddressListProps {
  addresses: Address[]
  editingId: string | null
  editAddressData: AddressFormData
  setEditAddressData: (data: AddressFormData) => void
  onEdit: (address: Address) => void
  onDelete: (addressId: string) => void
  onSaveEdit: () => void
  onCancel: () => void
  errors: Record<string, string>
}

const AddressList = ({
  addresses,
  editingId,
  editAddressData,
  setEditAddressData,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancel,
  errors
}: AddressListProps) => {
  if (addresses.length === 0) {
    return null
  }

  const rows = []
  for (let i = 0; i < addresses.length; i += 2) {
    const row = addresses.slice(i, i + 2)
    rows.push(
      <div key={i} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {row.map((address) =>
          editingId === address.id ? (
            <AddressForm
              key={address.id}
              data={editAddressData}
              setData={setEditAddressData}
              onSave={onSaveEdit}
              onCancel={onCancel}
              saveButtonText='Cập nhật địa chỉ'
              errors={errors}
            />
          ) : (
            <AddressCard key={address.id} address={address} onEdit={onEdit} onDelete={onDelete} />
          )
        )}
      </div>
    )
  }

  return <>{rows}</>
}

export default AddressList
