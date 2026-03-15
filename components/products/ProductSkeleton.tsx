export default function ProductSkeleton() {
  return (
    // bg-[var(--surface)]  border-[var(--border)]
    <div className='bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden h-full flex flex-col'>
      {/* skeleton class = shimmer animation from globals.css */}
      <div className='h-52 skeleton' />
      <div className='p-4 flex flex-col gap-3 flex-1'>
        <div className='h-4 skeleton rounded-full w-3/4' />
        <div className='h-3 skeleton rounded-full w-1/2' />
        <div className='flex items-center gap-1 mt-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='w-3 h-3 skeleton rounded-sm' />
          ))}
        </div>
        <div className='flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]'>
          <div className='h-5 skeleton rounded-full w-16' />
          <div className='h-7 skeleton rounded-lg w-14' />
        </div>
      </div>
    </div>
  )
}
