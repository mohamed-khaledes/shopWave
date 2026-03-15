'use client'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, Package, AlertCircle } from 'lucide-react'
import { useLogin } from '@/hooks/auth/use-login'

const Login = () => {
  const {
    error,
    handleSubmit,
    email,
    setEmail,
    showPassword,
    password,
    setPassword,
    setShowPassword,
    loading
  } = useLogin()

  return (
    <div className='min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='flex justify-center mb-8'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30'>
              <Package size={20} className='text-[var(--text-primary)]' />
            </div>
            <span className="font-bold text-2xl tracking-tight text-[var(--text-primary)] font-['Syne']">
              Shop<span className='text-violet-400'>Wave</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className='bg-[--surface] border border-[var(--border)] rounded-2xl p-8 shadow-2xl shadow-black/20'>
          <div className='mb-7'>
            <h1 className='text-2xl font-bold text-[var(--text-primary)] mb-1'>Welcome back</h1>
            <p className='text-[--text-secondary] text-sm'>Sign in to your ShopWave account</p>
          </div>

          {/* Demo credentials hint */}
          <div className='mb-6 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300'>
            <strong>Demo:</strong> demo@shopwave.com / password123
          </div>

          {/* Error */}
          {error && (
            <div className='mb-5 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm'>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email */}
            <div>
              <label className='block text-sm text-[--text-secondary] mb-1.5'>Email</label>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='w-full px-4 py-3 rounded-xl bg-[--surface-alt] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[--text-muted] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all'
                placeholder='you@example.com'
              />
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm text-[--text-secondary] mb-1.5'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className='w-full px-4 py-3 pr-11 rounded-xl bg-[--surface-alt] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[--text-muted] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-[--text-secondary] hover:text-zinc-300 transition-colors'
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-[var(--text-primary)] font-medium text-sm transition-all shadow-lg shadow-violet-900/30 mt-2'
            >
              {loading ? (
                <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className='text-center text-sm text-[--text-secondary] mt-6'>
            Don&apos;t have an account?{' '}
            <Link
              href='/register'
              className='text-violet-400 hover:text-violet-300 font-medium transition-colors'
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
