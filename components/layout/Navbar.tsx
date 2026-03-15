'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, LogOut, Package, User, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { logout } from '@/store/authSlice'
import { useTheme } from '@/providers/ThemeProvider' // ← new import

export default function Navbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isAuthenticated, user } = useAppSelector(s => s.auth)
  const cartCount = useAppSelector(s => s.cart.items.reduce((sum, i) => sum + i.quantity, 0))
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme() // ← new

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }

  return (
    <header className='sticky top-0 z-50 bg-[--bg]/80 backdrop-blur-xl border-b border-[var(--border)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/products' className='flex items-center gap-2 group'>
            <div className='w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all'>
              <Package size={16} className='text-[var(--text-primary)]' />
            </div>
            <span className='font-bold text-lg tracking-tight text-[var(--text-primary)]'>
              Shop<span className='text-violet-500'>Wave</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden md:flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <Link
                  href='/products'
                  className='text-sm text-[--text-secondary] hover:text-[var(--text-primary)] transition-colors'
                >
                  Products
                </Link>

                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-[--surface-alt] border border-[var(--border)]'>
                  <User size={14} className='text-violet-500' />
                  <span className='text-sm text-[--text-secondary]'>{user?.name}</span>
                </div>

                <Link
                  href={'/cart'}
                  className='relative p-2 rounded-lg hover:bg-[--surface-alt] transition-colors'
                >
                  <ShoppingCart size={20} className='text-[--text-secondary]' />
                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-[var(--text-primary)] text-xs rounded-full flex items-center justify-center font-bold'>
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 text-sm text-[--text-secondary] hover:text-red-500 transition-colors'
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className='text-sm text-[--text-secondary] hover:text-[var(--text-primary)] transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-[var(--text-primary)] text-sm font-medium transition-colors'
                >
                  Get Started
                </Link>
              </>
            )}

            {/* ── Theme toggle button ── */}
            <button
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='p-2 rounded-lg hover:bg-[--surface-alt] border border-[var(--border)] text-[--text-secondary] hover:text-[var(--text-primary)] transition-colors'
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>

          {/* Mobile: toggle + theme */}
          <div className='md:hidden flex items-center gap-2'>
            <button
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='p-2 rounded-lg text-[--text-secondary]'
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className='p-2 rounded-lg hover:bg-[--surface-alt] text-[--text-secondary]'
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className='md:hidden py-4 border-t border-[var(--border)] space-y-2'>
            {isAuthenticated ? (
              <>
                <Link href='/products' className='block px-3 py-2 text-[--text-secondary] text-sm'>
                  Products
                </Link>
                <div className='px-3 py-2 text-sm text-[--text-muted]'>{user?.name}</div>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-3 py-2 text-sm text-red-500'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href='/login' className='block px-3 py-2 text-[--text-secondary] text-sm'>
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='block px-3 py-2 text-violet-500 text-sm font-medium'
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
