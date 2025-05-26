export interface Address {
  id: string
  userId: string
  firstName: string
  lastName: string
  company?: string
  address: string
  city: string
  country: string
  postalCode: string
  phone: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface AddressFormData {
  firstName: string
  lastName: string
  company?: string
  address: string
  city: string
  country: string
  postalCode: string
  phone: string
  isDefault: boolean
}
