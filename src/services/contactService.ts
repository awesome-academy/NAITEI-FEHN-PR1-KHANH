import axios from 'axios'
import type { Contact } from '../interfaces/Contact'
import { API_URL } from './api'

export const contactService = {
  async createContact(contactData: Omit<Contact, 'id' | 'createdAt' | 'status'>): Promise<Contact> {
    const newContact = {
      ...contactData,
      createdAt: new Date().toISOString(),
      status: 'new'
    }
    const response = await axios.post<Contact>(`${API_URL}/contacts`, newContact)
    return response.data
  }
}
