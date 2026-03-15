import { ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center py-28 gap-5'>
      <div className='w-20 h-20 rounded-2xl bg-[var(--surface-alt)] border border-[var(--border)] flex items-center justify-center'>
        <ShoppingCart size={32} className='text-[var(--text-muted)]' />
      </div>
      <div className='text-center'>
        <h3 className='text-xl font-bold text-[var(--text-primary)] mb-2'>Your cart is empty</h3>
        <p className='text-[var(--text-secondary)] text-sm max-w-xs'>
          Looks like you haven&apos;t added anything yet. Browse our products to get started.
        </p>
      </div>
      <Link
        href='/products'
        className='flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-lg shadow-violet-900/25'
      >
        <ShoppingBag size={16} />
        Browse Products
      </Link>
    </div>
  )
}
