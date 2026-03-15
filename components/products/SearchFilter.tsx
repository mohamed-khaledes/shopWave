'use client'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setSearchQuery, setCategory } from '@/store/productsSlice'
import { capitalize } from '@/lib/utils'

export default function SearchFilter() {
  const dispatch = useAppDispatch()
  const { searchQuery, selectedCategory, categories, filteredItems } = useAppSelector(
    s => s.products
  )

  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      {/* Search Input */}
      <div className='relative flex-1'>
        <Search
          size={16}
          className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[--text-muted] pointer-events-none'
        />
        <input
          type='text'
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value))}
          placeholder='Search products…'
          className='w-full pl-10 pr-10 py-2.5 rounded-xl bg-(--surface) border border-[var(--border)] text-[text-primary] placeholder:text-[--text-muted] text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all'
        />
        {searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(''))}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-[--text-muted] hover:text-[--text-secondary] transition-colors'
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className='relative'>
        <SlidersHorizontal
          size={14}
          className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[--text-muted] pointer-events-none'
        />
        <select
          value={selectedCategory}
          onChange={e => dispatch(setCategory(e.target.value))}
          className='appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-(--surface) border border-[var(--border)] text-[text-primary] text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all cursor-pointer min-w-[160px]'
        >
          <option value='all'>All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {capitalize(cat)}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[--text-muted] text-xs'>
          ▾
        </div>
      </div>

      {/* Result count badge */}
      <div className='flex items-center px-4 py-2.5 rounded-xl bg-[--surface-alt] border border-white/5 text-sm text-[--text-secondary] whitespace-nowrap'>
        <span className='text-violet-400 font-semibold mr-1'>{filteredItems.length}</span>
        results
      </div>
    </div>
  )
}
