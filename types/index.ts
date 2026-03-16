// ─── Product Types ────────────────────────────────────────────────────────────
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// ─── Auth Types ───────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  redirectLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

// ─── Products State ───────────────────────────────────────────────────────────
export interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  categories: string[]
  selectedCategory: string
  searchQuery: string
  loading: boolean
  error: string | null
  page: number
  hasMore: boolean
  selectedProduct: Product | null
}

// ─── Cart Types ───────────────────────────────────────────────────────────────
export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  total: number
}
