import type React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { contactService } from '../../services/contactService'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    setIsSubmitting(true)

    try {
      await contactService.createContact(formData)
      toast.success('Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-2xl'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='flex items-center'>
          <label className='w-32 text-gray-600 text-sm'>Your Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-yellow-500 bg-gray-50'
            required
          />
        </div>

        <div className='flex items-center'>
          <label className='w-32 text-gray-600 text-sm'>Your Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-yellow-500 bg-gray-50'
            required
          />
        </div>

        <div className='flex items-center'>
          <label className='w-32 text-gray-600 text-sm'>Subject</label>
          <input
            type='text'
            name='subject'
            value={formData.subject}
            onChange={handleChange}
            className='flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-yellow-500 bg-gray-50'
            required
          />
        </div>

        <div className='flex items-start'>
          <label className='w-32 text-gray-600 text-sm pt-2'>Your Message</label>
          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className='flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-yellow-500 bg-gray-50 resize-vertical'
            required
          />
        </div>

        <div className='flex items-center'>
          <div className='w-32'></div>
          <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
            {isSubmitting ? 'ĐANG GỬI...' : 'GỬI'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
