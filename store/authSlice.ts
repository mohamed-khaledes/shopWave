import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, LoginCredentials, RegisterCredentials } from '@/types'
import { setToken, removeToken, cacheUser, clearCachedUser } from '@/lib/auth'

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  redirectLoading: true,
  error: null
}

// ─── Async Thunks ─────────────────────────────────────────────────────────────

/** Login user and store JWT */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      // Persist token and user in cookies/localStorage
      setToken(data.token)
      cacheUser(data.user)
      return data
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed'
      return rejectWithValue(message)
    }
  }
)

/** Register new user */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')
      setToken(data.token)
      cacheUser(data.user)
      return data
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      return rejectWithValue(message)
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Restore auth state from cache on app load */
    restoreAuth(state, action: PayloadAction<{ user: AuthState['user']; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.redirectLoading = false
      state.isAuthenticated = true
    },
    /** Logout: clear all auth state */
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      removeToken()
      clearCachedUser()
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.redirectLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.redirectLoading = false
        state.error = action.payload as string
      })

    // Register
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.redirectLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.redirectLoading = false
        state.error = action.payload as string
      })
  }
})

export const { restoreAuth, logout, clearError } = authSlice.actions
export default authSlice.reducer
