import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { registerUser, clearError } from '@/store/authSlice'

export const useRegister = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error, isAuthenticated } = useAppSelector(s => s.auth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    dispatch(registerUser({ name, email, password }))
  }
  return {
    error,
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    loading
  }
}
