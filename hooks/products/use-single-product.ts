import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchProductById, clearSelectedProduct } from '@/store/productsSlice'
import { addToCart } from '@/store/cartSlice'
import { Product } from '@/types'

export const useSingleProduct = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isAuthenticated } = useAppSelector(s => s.auth)
  const { selectedProduct: product, loading, error } = useAppSelector(s => s.products)

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated, router])

  // Fetch product on mount
  useEffect(() => {
    if (id && isAuthenticated) {
      dispatch(fetchProductById(Number(id)))
    }
    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [dispatch, id, isAuthenticated])
  //error state on retry fn
  const onRetry = () => dispatch(fetchProductById(Number(id)))
  // add to cart fn
  const handleAddToCart = () => dispatch(addToCart(product as Product))

  return { isAuthenticated, router, error, onRetry, loading, product, handleAddToCart }
}
