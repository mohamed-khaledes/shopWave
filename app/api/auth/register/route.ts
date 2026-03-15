import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "shopwave_super_secret_dev_key_2024";

// In-memory user store (simulates a DB; replace with real DB in production)
const registeredUsers: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
}> = [];

/**
 * POST /api/auth/register
 * Creates a new user account and returns a JWT token.
 *
 * Body: { name: string, email: string, password: string }
 *
 * Postman: POST https://your-domain/api/auth/register
 * Headers: Content-Type: application/json
 * Body (raw JSON): { "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Input validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = registeredUsers.find((u) => u.email === email);
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In production, hash with bcrypt
    };
    registeredUsers.push(newUser);

    // Sign JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
