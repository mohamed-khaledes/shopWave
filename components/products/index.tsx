'use client'
import { Loader2 } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import ProductSkeleton from '@/components/products/ProductSkeleton'
import SearchFilter from '@/components/products/SearchFilter'
import ErrorState from '@/components/ui/ErrorState'
import { useProducts } from '@/hooks/products/use-products'

const Products = () => {
  const { isAuthenticated, error, onRetry, loading, visibleItems, sentinelRef, hasMore } =
    useProducts()
  if (!isAuthenticated) return null

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      {/* Page Header */}
      <div className='mb-10'>
        <h1 className='text-4xl font-bold text-[var(--text-primary)] mb-2'>
          <span className='gradient-text'>All Products</span>
        </h1>
        <p className='text-[--text-secondary] text-sm'>
          Browse our curated collection from the FakeStore API
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className='mb-8'>
        <SearchFilter />
      </div>

      {/* Error State */}
      {error && <ErrorState message={error} onRetry={onRetry} />}

      {/* Products Grid */}
      {!error && (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 product-grid'>
            {loading && visibleItems.length === 0
              ? // Show skeletons on initial load
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className='fade-in-up'>
                    <ProductSkeleton />
                  </div>
                ))
              : visibleItems.map(product => (
                  <div key={product.id} className='fade-in-up'>
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>

          {/* Empty State */}
          {!loading && visibleItems.length === 0 && (
            <div className='flex flex-col items-center justify-center py-24 gap-4'>
              <div className='text-5xl'>🔍</div>
              <h3 className='text-[var(--text-primary)] font-semibold text-lg'>
                No products found
              </h3>
              <p className='text-[--text-secondary] text-sm'>
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          <div ref={sentinelRef} className='h-10 mt-8 flex items-center justify-center'>
            {loading && visibleItems.length > 0 && (
              <Loader2 size={24} className='text-violet-400 animate-spin' />
            )}
            {!hasMore && visibleItems.length > 0 && (
              <p className='text-[--text-secondary] text-sm'>All products loaded</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
