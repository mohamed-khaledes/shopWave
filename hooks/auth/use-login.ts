import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { loginUser, clearError } from '@/store/authSlice'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error, isAuthenticated } = useAppSelector(s => s.auth)

  const [email, setEmail] = useState('demo@shopwave.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) router.push('/products')
  }, [isAuthenticated, router])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }
  return {
    error,
    handleSubmit,
    email,
    setEmail,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    loading
  }
}
