'use client'

import { ArrowLeft } from 'lucide-react'
import { CartRow } from './cart-row'
import { EmptyCart } from './empty-cart'
import { OrderSummary } from './order-summary'
import { useCart } from '@/hooks/cart/use-cart'

export default function Cart() {
  const { items, isAuthenticated, router } = useCart()

  if (!isAuthenticated) return null

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-[var(--text-primary)]'>
            Your Cart
            {items.length > 0 && (
              <span className='ml-3 text-base font-normal text-[var(--text-muted)]'>
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            )}
          </h1>
        </div>
        <button
          onClick={() => router.back()}
          className='flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group'
        >
          <ArrowLeft size={15} className='group-hover:-translate-x-0.5 transition-transform' />
          Continue shopping
        </button>
      </div>

      {items?.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start'>
          {/* Items list */}
          <div className='flex flex-col gap-3'>
            {items?.map(item => (
              <CartRow key={item.id} item={item} />
            ))}
          </div>

          {/* Order summary */}
          <OrderSummary />
        </div>
      )}
    </div>
  )
}
