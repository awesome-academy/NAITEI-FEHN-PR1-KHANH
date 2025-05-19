export interface User {
  id?: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}
