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
import PageTitle from '../components/ui/PageTitle'

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ').min(1, 'Email là bắt buộc'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      loginSchema.parse(formData)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<LoginFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message
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
      await login(formData.email, formData.password)
      toast.success('Đăng nhập thành công!')
      setTimeout(() => {
        navigate('/')
      }, 500)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.')
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
            <span className='text-yellow-600'>Đăng nhập</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <PageTitle title='ĐĂNG NHẬP' />
          <Link
            to='/register'
            className='bg-black text-white px-8 py-3 uppercase font-bold text-sm hover:bg-yellow-600 transition-colors'
          >
            ĐĂNG KÝ
          </Link>
        </div>

        <div className='max-w-full mx-auto border border-gray-200 p-8'>
          <h2 className='text-xl font-medium text-gray-800 uppercase mb-4'>KHÁCH HÀNG ĐĂNG NHẬP</h2>
          <p className='text-gray-600 mb-6'>Nếu bạn có một tài khoản, xin vui lòng đăng nhập.</p>

          <form onSubmit={handleSubmit}>
            <Input
              label='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <PasswordInput
              label='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Checkbox
              label='Quên mật khẩu'
              checked={forgotPassword}
              onChange={() => setForgotPassword(!forgotPassword)}
            />

            <Button type='submit' isLoading={isSubmitting}>
              ĐĂNG NHẬP
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
