import Link from 'next/link'
import { Trash2, Plus, Minus, Tag } from 'lucide-react'
import { useAppDispatch } from '@/hooks/redux'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { formatPrice, capitalize, truncate } from '@/lib/utils'
import type { CartItem } from '@/types'

export const CartRow = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch()
  return (
    <div className='flex gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl group transition-all hover:border-violet-500/20'>
      {/* Product image */}
      <Link
        href={`/products/${item.id}`}
        className='shrink-0 w-24 h-24 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-[var(--border)]'
      >
        <img
          src={item.image}
          alt={item.title}
          className='w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300'
        />
      </Link>

      {/* Info */}
      <div className='flex flex-col flex-1 gap-1 min-w-0'>
        {/* Category */}
        <span className='flex items-center gap-1 text-xs text-violet-500 font-medium'>
          <Tag size={11} />
          {capitalize(item.category)}
        </span>

        {/* Title */}
        <Link href={`/products/${item.id}`}>
          <h3 className='text-sm font-medium text-[var(--text-primary)] hover:text-violet-500 transition-colors leading-snug'>
            {truncate(item.title, 65)}
          </h3>
        </Link>

        {/* Unit price */}
        <p className='text-xs text-[var(--text-muted)] mt-0.5'>{formatPrice(item.price)} each</p>

        {/* Controls row */}
        <div className='flex items-center justify-between mt-auto pt-2'>
          {/* Quantity stepper */}
          <div className='flex items-center gap-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg p-0.5'>
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              aria-label='Decrease quantity'
              className='w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-all'
            >
              <Minus size={13} />
            </button>
            <span className='w-7 text-center text-sm font-semibold text-[var(--text-primary)] tabular-nums'>
              {item.quantity}
            </span>
            <button
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              aria-label='Increase quantity'
              className='w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-all'
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Line total + remove */}
          <div className='flex items-center gap-3'>
            <span className='text-base font-bold text-[var(--text-primary)]'>
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label='Remove item'
              className='p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all'
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
