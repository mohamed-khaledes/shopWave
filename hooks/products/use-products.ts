import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchProducts, loadMore } from '@/store/productsSlice'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
const PAGE_SIZE = 8

export const useProducts = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isAuthenticated } = useAppSelector(s => s.auth)
  const { filteredItems, loading, error, page, hasMore } = useAppSelector(s => s.products)

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) router.push("/login");
  // }, [isAuthenticated, router]);

  // Initial data fetch
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts())
    }
  }, [dispatch, isAuthenticated])

  // Infinite scroll: load next page when sentinel enters viewport
  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(loadMore())
    }
  }, [dispatch, hasMore, loading])

  const sentinelRef = useIntersectionObserver(handleLoadMore, hasMore && !loading)

  // Slice items for current page
  const visibleItems = filteredItems.slice(0, page * PAGE_SIZE)
  // error retry fn
  const onRetry = () => dispatch(fetchProducts())
  return {
    onRetry,
    isAuthenticated,
    error,
    dispatch,
    loading,
    visibleItems,
    sentinelRef,
    hasMore,
    router
  }
}
