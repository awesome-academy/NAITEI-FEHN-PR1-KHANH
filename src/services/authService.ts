import type { User, LoginCredentials, AuthResponse } from '../interfaces/User'
import axios from 'axios'
import { API_URL } from './api'

const generateToken = (user: User): string => {
  return `mock-jwt-token-${user.id}-${Date.now()}`
}

const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const authService = {
  async register(userData: User): Promise<void> {
    const existingUsers = await axios.get<User[]>(`${API_URL}/users?email=${userData.email}`)

    if (existingUsers.data.length > 0) {
      throw new Error('Email đã được sử dụng. Vui lòng chọn email khác.')
    }

    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await axios.post<User>(`${API_URL}/users`, newUser)
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password } = credentials

    const response = await axios.get<User[]>(`${API_URL}/users?email=${email}`)

    if (response.data.length === 0) {
      throw new Error('Email hoặc mật khẩu không chính xác.')
    }

    const user = response.data[0]

    if (user.password !== password) {
      throw new Error('Email hoặc mật khẩu không chính xác.')
    }

    const token = generateToken(user)

    localStorage.setItem(
      'auth',
      JSON.stringify({
        user: sanitizeUser(user),
        token
      })
    )

    return {
      user: sanitizeUser(user),
      token
    }
  },

  logout(): void {
    localStorage.removeItem('auth')
  },

  getCurrentUser(): AuthResponse | null {
    const auth = localStorage.getItem('auth')
    return auth ? JSON.parse(auth) : null
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser()
  }
}
