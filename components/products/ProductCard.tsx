'use client'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import { addToCart } from '@/store/cartSlice'
import { formatPrice, truncate, capitalize } from '@/lib/utils'
import type { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <Link href={`/products/${product.id}`}>
      <article
        className='group relative
          bg-[var(--surface)]
          border border-[var(--border)]
          rounded-2xl overflow-hidden
          hover:border-violet-500/40
          hover:shadow-[var(--shadow-hover)]
          shadow-[var(--shadow-card)]
          transition-all duration-300
          hover:-translate-y-1
          cursor-pointer h-full flex flex-col'
      >
        {/* Image — always white bg so product photos render correctly */}
        <div className='relative h-52 bg-white flex items-center justify-center overflow-hidden'>
          <img
            src={product.image}
            alt={product.title}
            loading='lazy'
            className='object-contain p-4 w-full h-full group-hover:scale-105 transition-transform duration-500'
          />
          <span className='absolute top-3 left-3 px-2 py-1 rounded-full bg-violet-600 text-xs text-white'>
            {capitalize(product.category)}
          </span>
        </div>

        {/* Content */}
        <div className='p-4 flex flex-col flex-1 gap-3'>
          {/* Title */}
          <h3 className='text-sm font-medium text-[var(--text-primary)] leading-snug group-hover:text-violet-500 transition-colors'>
            {truncate(product.title, 60)}
          </h3>

          {/* Rating */}
          <div className='flex items-center gap-1.5'>
            <div className='flex items-center gap-0.5'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.round(product.rating.rate)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-[var(--text-muted)]'
                  }
                />
              ))}
            </div>
            <span className='text-xs text-[var(--text-muted)]'>({product.rating.count})</span>
          </div>

          {/* Description */}
          <h3 className='text-sm font-normal text-[var(--text-primary)] leading-snug group-hover:text-violet-500 transition-colors'>
            {truncate(product?.description, 70)}
          </h3>
          {/* Price + Add to Cart */}
          <div className='flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]'>
            <span className='text-lg font-bold text-[var(--text-primary)]'>
              {formatPrice(product.price)}
            </span>
            <button
              onClick={e => {
                e.preventDefault()
                dispatch(addToCart(product))
              }}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                bg-violet-600/10 hover:bg-violet-600
                text-violet-500 hover:text-white
                text-xs font-medium
                border border-violet-500/30 hover:border-violet-600
                transition-all duration-200'
            >
              <ShoppingCart size={13} />
              Add
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}
