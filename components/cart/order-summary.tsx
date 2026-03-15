import { ChevronRight } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearCart } from '@/store/cartSlice'
import { formatPrice } from '@/lib/utils'

export const OrderSummary = () => {
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector(s => s.cart)

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const shipping = total > 50 ? 0 : 4.99
  const tax = total * 0.08 // 8% tax
  const grandTotal = total + shipping + tax

  return (
    <div className='bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-4 sticky top-24'>
      <h2 className='text-lg font-bold text-[var(--text-primary)]'>Order Summary</h2>

      {/* Line items */}
      <div className='flex flex-col gap-2 text-sm'>
        <div className='flex justify-between text-[var(--text-secondary)]'>
          <span>
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className='text-[var(--text-primary)] font-medium'>{formatPrice(total)}</span>
        </div>

        <div className='flex justify-between text-[var(--text-secondary)]'>
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className='text-emerald-500 font-medium'>Free</span>
          ) : (
            <span className='text-[var(--text-primary)] font-medium'>{formatPrice(shipping)}</span>
          )}
        </div>

        <div className='flex justify-between text-[var(--text-secondary)]'>
          <span>Tax (8%)</span>
          <span className='text-[var(--text-primary)] font-medium'>{formatPrice(tax)}</span>
        </div>

        {/* Free shipping nudge */}
        {shipping > 0 && (
          <div className='mt-1 p-2.5 rounded-xl bg-violet-500/8 border border-violet-500/15 text-xs text-violet-500'>
            Add {formatPrice(50 - total)} more for free shipping
          </div>
        )}
      </div>

      {/* Divider */}
      <div className='border-t border-[var(--border)]' />

      {/* Grand total */}
      <div className='flex justify-between items-center'>
        <span className='font-bold text-[var(--text-primary)]'>Total</span>
        <span className='text-xl font-bold text-[var(--text-primary)]'>
          {formatPrice(grandTotal)}
        </span>
      </div>

      {/* Checkout button */}
      <button className='w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-900/25 hover:shadow-violet-900/40 group'>
        Proceed to Checkout
        <ChevronRight size={16} className='group-hover:translate-x-0.5 transition-transform' />
      </button>

      {/* Clear cart */}
      <button
        onClick={() => dispatch(clearCart())}
        className='w-full py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 text-sm font-medium transition-all'
      >
        Clear cart
      </button>

      {/* Trust badges */}
      <div className='flex flex-col gap-1.5 pt-1'>
        {['Free returns within 30 days', 'Secure SSL checkout', '24/7 support'].map(t => (
          <div key={t} className='flex items-center gap-2 text-xs text-[var(--text-muted)]'>
            <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0' />
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
