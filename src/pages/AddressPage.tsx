import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { addressService } from '../services/addressService'
import type { Address, AddressFormData } from '../interfaces/Address'
import { toast } from 'react-toastify'
import PageTitle from '../components/ui/PageTitle'
import AddressForm from '../components/Address/AddressForm'
import AddressList from '../components/Address/AddressList'

const AddressPage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const initialFormData: AddressFormData = {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: 'Hà Nội',
    country: 'Việt Nam',
    postalCode: '',
    phone: '',
    isDefault: false
  }

  const [newAddressData, setNewAddressData] = useState<AddressFormData>(initialFormData)
  const [editAddressData, setEditAddressData] = useState<AddressFormData>(initialFormData)

  useEffect(() => {
    fetchAddresses()
  }, [currentUser])

  const fetchAddresses = async () => {
    if (!isAuthenticated || !currentUser?.id) {
      setAddresses([])
      return
    }
    try {
      const userAddresses = await addressService.getAddressesByUserId(String(currentUser.id))
      setAddresses(userAddresses)
    } catch (error) {
      toast.error('Không thể tải danh sách địa chỉ')
    }
  }

  const validateForm = (data: AddressFormData): boolean => {
    const newErrors: Record<string, string> = {}

    if (!data.firstName.trim()) newErrors.firstName = 'Tên là bắt buộc'
    if (!data.lastName.trim()) newErrors.lastName = 'Họ & tên đệm là bắt buộc'
    if (!data.address.trim()) newErrors.address = 'Địa chỉ là bắt buộc'
    if (!data.postalCode.trim()) newErrors.postalCode = 'Postal/Zip Code là bắt buộc'
    if (!data.phone.trim()) newErrors.phone = 'Số điện thoại là bắt buộc'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddNew = () => {
    setShowAddForm(true)
    setEditingId(null)
    setErrors({})
    setNewAddressData(initialFormData)
  }

  const handleEdit = (address: Address) => {
    setEditingId(address.id)
    setShowAddForm(false)
    setErrors({})
    setEditAddressData({
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company ?? '',
      address: address.address,
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault
    })
  }

  const handleSaveNew = async () => {
    if (!currentUser?.id || !validateForm(newAddressData)) return

    try {
      const created = await addressService.createAddress(String(currentUser.id), newAddressData)
      if (created) {
        toast.success('Thêm địa chỉ thành công!')
        setShowAddForm(false)
        fetchAddresses()
      } else {
        toast.error('Không thể thêm địa chỉ')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm địa chỉ')
    }
  }

  const handleSaveEdit = async () => {
    if (!editingId || !validateForm(editAddressData)) return

    try {
      const updated = await addressService.updateAddress(editingId, editAddressData)
      if (updated) {
        toast.success('Cập nhật địa chỉ thành công!')
        setEditingId(null)
        fetchAddresses()
      } else {
        toast.error('Không thể cập nhật địa chỉ')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật địa chỉ')
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingId(null)
    setErrors({})
  }

  const handleDelete = async (addressId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) return

    try {
      const success = await addressService.deleteAddress(addressId)
      if (success) {
        toast.success('Xóa địa chỉ thành công!')
        fetchAddresses()
      } else {
        toast.error('Không thể xóa địa chỉ')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa địa chỉ')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className='bg-white'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center py-16'>
            <h1 className='text-2xl font-medium mb-6'>Vui lòng đăng nhập để quản lý địa chỉ</h1>
            <Link
              to='/login'
              className='inline-block bg-black text-white px-6 py-3 font-bold hover:bg-yellow-600 transition-colors'
            >
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center text-sm text-gray-600 mb-4'>
          <Link to='/' className='hover:text-yellow-600'>
            Trang chủ
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-yellow-600'>Địa chỉ</span>
        </div>

        <div className='mb-8'>
          <PageTitle title='ĐỊA CHỈ' />
        </div>

        <div className='mb-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-medium text-gray-800 uppercase'>ĐỊA CHỈ CỦA BẠN</h2>
            <button onClick={handleAddNew} className='text-cyan-500 hover:text-cyan-600 font-medium'>
              Thêm địa chỉ
            </button>
          </div>

          <div className='space-y-6'>
            {showAddForm && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <AddressForm
                  data={newAddressData}
                  setData={setNewAddressData}
                  onSave={handleSaveNew}
                  onCancel={handleCancel}
                  saveButtonText='Thêm địa chỉ'
                  errors={errors}
                />
                <div></div>
              </div>
            )}

            {addresses.length === 0 && !showAddForm ? (
              <div className='text-center py-8'>
                <p className='text-gray-600 mb-4'>Bạn chưa có địa chỉ nào.</p>
                <button
                  onClick={handleAddNew}
                  className='bg-black text-white px-6 py-3 font-bold hover:bg-yellow-600 transition-colors'
                >
                  THÊM ĐỊA CHỈ ĐẦU TIÊN
                </button>
              </div>
            ) : (
              <AddressList
                addresses={addresses}
                editingId={editingId}
                editAddressData={editAddressData}
                setEditAddressData={setEditAddressData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSaveEdit={handleSaveEdit}
                onCancel={handleCancel}
                errors={errors}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressPage
