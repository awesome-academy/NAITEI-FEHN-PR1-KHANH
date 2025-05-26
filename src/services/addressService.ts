import axios from 'axios'
import type { Address, AddressFormData } from '../interfaces/Address'
import { API_URL } from './api'

export const addressService = {
  async getAddressesByUserId(userId: string): Promise<Address[]> {
    const response = await axios.get(`${API_URL}/addresses?userId=${userId}`)
    return response.data
  },

  async createAddress(userId: string, addressData: AddressFormData): Promise<Address | null> {
    if (addressData.isDefault) {
      await this.unsetAllDefaultAddresses(userId)
    }

    const newAddress: Omit<Address, 'id'> = {
      ...addressData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const response = await axios.post(`${API_URL}/addresses`, newAddress)
    return response.data
  },

  async updateAddress(addressId: string, addressData: AddressFormData): Promise<Address | null> {
    if (addressData.isDefault) {
      const address = await this.getAddressById(addressId)
      if (address) {
        await this.unsetAllDefaultAddresses(address.userId)
      }
    }

    const updatedAddress = {
      ...addressData,
      updatedAt: new Date().toISOString()
    }

    const response = await axios.patch(`${API_URL}/addresses/${addressId}`, updatedAddress)
    return response.data
  },

  async deleteAddress(addressId: string): Promise<boolean> {
    await axios.delete(`${API_URL}/addresses/${addressId}`)
    return true
  },

  async getAddressById(addressId: string): Promise<Address | null> {
    const response = await axios.get(`${API_URL}/addresses/${addressId}`)
    return response.data
  },

  async setDefaultAddress(addressId: string): Promise<boolean> {
    const address = await this.getAddressById(addressId)
    if (!address) return false

    await this.unsetAllDefaultAddresses(address.userId)

    await axios.patch(`${API_URL}/addresses/${addressId}`, {
      isDefault: true,
      updatedAt: new Date().toISOString()
    })

    return true
  },

  async unsetAllDefaultAddresses(userId: string): Promise<void> {
    const addresses = await this.getAddressesByUserId(userId)
    const defaultAddresses = addresses.filter((addr) => addr.isDefault)

    for (const address of defaultAddresses) {
      await axios.patch(`${API_URL}/addresses/${address.id}`, {
        isDefault: false,
        updatedAt: new Date().toISOString()
      })
    }
  }
}
