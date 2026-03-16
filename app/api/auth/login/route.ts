import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'shopwave_super_secret_dev_key_2024'

// Mock user database (in production, use a real DB like PostgreSQL)
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@shopwave.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john1234'
  }
]

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // Find user in mock DB
    const user = MOCK_USERS.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    // Sign JWT (expires in 7 days)
    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: '7d'
    })

    return NextResponse.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
