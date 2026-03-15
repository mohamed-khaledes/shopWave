import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks/redux'
export const useCart = () => {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector(s => s.auth)
  const { items } = useAppSelector(s => s.cart)

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  return { items, isAuthenticated, router }
}
