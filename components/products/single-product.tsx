'use client'
import { ArrowLeft, Star, ShoppingCart, Tag, BarChart3, CheckCircle } from 'lucide-react'
import { formatPrice, capitalize } from '@/lib/utils'
import ErrorState from '@/components/ui/ErrorState'
import { useSingleProduct } from '@/hooks/products/use-single-product'

const SingleProduct = () => {
  const { isAuthenticated, router, error, onRetry, loading, product, handleAddToCart } =
    useSingleProduct()
  if (!isAuthenticated) return null
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className='flex items-center gap-2 text-sm text-zinc-400 hover:text-[var(--text-primary)] transition-colors mb-8 group'
      >
        <ArrowLeft size={16} className='group-hover:-translate-x-1 transition-transform' />
        Back to products
      </button>

      {/* Error */}
      {error && <ErrorState message={error} onRetry={onRetry} />}

      {/* Loading Skeleton */}
      {loading && !product && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse'>
          <div className='h-96 text-[--surface] rounded-2xl border border-white/5' />
          <div className='space-y-4'>
            <div className='h-6 skeleton rounded-full w-1/4' />
            <div className='h-8 skeleton rounded-full w-3/4' />
            <div className='h-8 skeleton rounded-full w-1/2' />
            <div className='space-y-2 pt-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='h-3 skeleton rounded-full' />
              ))}
            </div>
            <div className='h-12 skeleton rounded-xl w-full mt-6' />
          </div>
        </div>
      )}

      {/* Product Detail */}
      {product && !loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 fade-in-up'>
          {/* Image Panel */}
          <div className='relative bg-white rounded-2xl border border-[var(--border)] overflow-hidden h-[420px] flex items-center justify-center p-10'>
            <img
              src={product.image}
              alt={product.title}
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-contain p-8'
            />
          </div>

          {/* Info Panel */}
          <div className='flex flex-col gap-5'>
            {/* Category badge */}
            <div className='flex items-center gap-2'>
              <Tag size={13} className='text-violet-400' />
              <span className='text-sm text-violet-400 font-medium'>
                {capitalize(product.category)}
              </span>
            </div>

            {/* Title */}
            <h1 className='text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-snug'>
              {product.title}
            </h1>

            {/* Rating */}
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(product.rating.rate)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-[--text-muted]'
                    }
                  />
                ))}
              </div>
              <span className='text-sm text-zinc-400'>{product.rating.rate} out of 5</span>
              <span className='text-sm text-[--text-secondary]'>
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className='flex items-end gap-3'>
              <span className='text-4xl font-bold text-[var(--text-primary)]'>
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Divider */}
            <div className='border-t border-white/5' />

            {/* Description */}
            <div>
              <h3 className='text-sm font-semibold text-zinc-300 mb-2'>Description</h3>
              <p className='text-zinc-400 text-sm leading-relaxed'>{product.description}</p>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 gap-3 mt-1'>
              <div className='flex items-center gap-3 p-3 rounded-xl text-[--surface] border border-white/5'>
                <BarChart3 size={16} className='text-violet-400' />
                <div>
                  <p className='text-xs text-[--text-secondary]'>Popularity</p>
                  <p className='text-sm font-medium text-[var(--text-primary)]'>
                    {product.rating.count} sold
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-3 rounded-xl text-[--surface] border border-white/5'>
                <CheckCircle size={16} className='text-emerald-400' />
                <div>
                  <p className='text-xs text-[--text-secondary]'>Status</p>
                  <p className='text-sm font-medium text-emerald-400'>In Stock</p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className='flex items-center justify-center gap-3 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-[var(--text-primary)] font-semibold transition-all shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 group mt-2'
            >
              <ShoppingCart size={18} className='group-hover:scale-110 transition-transform' />
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleProduct
