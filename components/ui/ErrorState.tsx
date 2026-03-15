'use client'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-24 gap-5'>
      <div className='w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center'>
        <AlertTriangle size={28} className='text-red-400' />
      </div>
      <div className='text-center'>
        <h3 className='text-[var(--text-primary)] font-semibold mb-1'>Oops!</h3>
        <p className=' text-[--text-secondary] text-sm max-w-xs'>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[--surface-alt] hover:bg-white/10 border border-[var(--border)] text-[var(--text-primary)] text-sm transition-all'
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  )
}
