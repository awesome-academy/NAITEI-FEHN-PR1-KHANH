import type React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { z } from 'zod'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

import Input from '../components/ui/Input'
import PasswordInput from '../components/ui/PasswordInput'
import Checkbox from '../components/ui/Checkbox'
import Button from '../components/ui/Button'
import FormSection from '../components/ui/FormSection'
import PageTitle from '../components/ui/PageTitle'

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'Tên trước là bắt buộc'),
    lastName: z.string().min(1, 'Tên sau là bắt buộc'),
    email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
    newsletter: z.boolean().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      registerSchema.parse(formData)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof RegisterFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof RegisterFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      })
      toast.success('Đăng ký thành công!')
      setTimeout(() => {
        navigate('/login')
      }, 500)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại sau.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-white'>
      <div className='bg-gray-100 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center text-sm text-gray-600'>
            <Link to='/' className='hover:text-yellow-600 flex items-center'>
              <FaHome className='mr-1' /> Trang chủ
            </Link>
            <span className='mx-2'>/</span>
            <span className='text-yellow-600'>Đăng ký</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <PageTitle title='ĐĂNG KÝ' />
          <Link
            to='/login'
            className='bg-black text-white px-8 py-3 uppercase font-bold text-sm hover:bg-yellow-600 transition-colors'
          >
            ĐĂNG NHẬP
          </Link>
        </div>

        <div className='max-w-full mx-auto border border-gray-200 p-8'>
          <form onSubmit={handleSubmit}>
            <FormSection title='THÔNG TIN CÁ NHÂN'>
              <Input
                label='Tên trước'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />

              <Input
                label='Tên sau'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />

              <Input
                label='Email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
            </FormSection>

            <FormSection title='THÔNG TIN ĐĂNG NHẬP'>
              <PasswordInput
                label='Mật khẩu'
                name='password'
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <PasswordInput
                label='Xác nhận mật khẩu'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />
            </FormSection>

            <Checkbox
              label='Đăng ký nhận bản tin'
              name='newsletter'
              checked={formData.newsletter}
              onChange={handleChange}
            />

            <div className='flex justify-end space-x-4'>
              <Button type='submit' isLoading={isSubmitting}>
                GỬI
              </Button>
              <Button type='button' variant='secondary' onClick={() => navigate('/')}>
                QUAY LẠI
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
