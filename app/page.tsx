import { redirect } from 'next/navigation'

// Root page: redirect to products (or login if not authed — handled client-side)
export default function Home() {
  redirect('/products')
}
