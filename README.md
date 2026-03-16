# ShopWave — Full-Stack Next.js Product Store

Production-grade e-commerce product browser: **Next.js 16 + Redux Toolkit + TypeScript + Tailwind
CSS**.

---

## Public API Used

**FakeStore API** — `https://fakestoreapi.com`

| Endpoint                   | Method | Description    |
| -------------------------- | ------ | -------------- |
| `/products`                | GET    | All products   |
| `/products/:id`            | GET    | Single product |
| `/products/categories`     | GET    | All categories |
| `/products/category/:name` | GET    | By category    |

---

## Postman Links

### FakeStore API

```
GET  https://fakestoreapi.com/products
GET  https://fakestoreapi.com/products/1
GET  https://fakestoreapi.com/products/categories
GET  https://fakestoreapi.com/products/category/electronics
```

### ShopWave Auth API (local)

```
POST http://localhost:3000/api/auth/login
POST http://localhost:3000/api/auth/register
```

#### Login Request

```json
POST /api/auth/login
{ "email": "demo@shopwave.com", "password": "password123" }

Response 200:
{ "token": "eyJ...", "user": { "id": "1", "name": "Demo User", "email": "demo@shopwave.com" } }
```

#### Register Request

```json
POST /api/auth/register
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }

Response 201:
{ "token": "eyJ...", "user": { "id": "user_xxx", "name": "Jane Doe", "email": "jane@example.com" } }
```

#### Error Codes

- `400` Missing fields / password too short
- `401` Invalid credentials
- `409` Email already registered
- `500` Server error

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm test          # 27 unit tests
npm run build     # Production build
```

### Demo Credentials

| Email             | Password    |
| ----------------- | ----------- |
| demo@shopwave.com | password123 |
| john@example.com  | john1234    |

### Optional .env.local

```
JWT_SECRET=your_secret_here
```

---

## Project Structure

```
shopwave/
├── app/
│   ├── api/auth/login/route.ts      # JWT login endpoint
│   ├── api/auth/register/route.ts   # JWT register endpoint
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── products/page.tsx            # Grid + infinite scroll
│   ├── products/[id]/page.tsx       # Detail page
│   ├── cart                         # cart page
│   └── layout.tsx
├── store/
│   ├── authSlice.ts                 # Login/register/logout
│   ├── productsSlice.ts             # Fetch, filter, paginate
│   └── cartSlice.ts                 # Add/remove/update cart
├── components/
│   ├── layout/Navbar.tsx
│   └── products/ProductCard, SearchFilter, ProductSkeleton
│   └── cart/index, cart-row, empty-cart, order-summary
│   └── auth/login, register
├── hooks/
│   ├── redux.ts                     # Typed dispatch/selector
│   └── useIntersectionObserver.ts   # Infinite scroll
│   └── products/use-products.ts , use-single-products.ts
│   └── auth/use-login.ts, use-register.ts
│   └── cart/use-cart.ts 
├── lib/
│   ├── auth.ts                      # Cookie + localStorage
│   ├── apiClient.ts                 # Axios + interceptors
│   └── utils.ts
└── __tests__/shopwave.test.ts       # 27 passing tests
```

---

## Features

| Feature                      | Status |
| ---------------------------- | ------ |
| JWT Auth (login + register)  | ✅     |
| Token in secure cookie (7d)  | ✅     |
| Session restore on reload    | ✅     |
| Product grid (FakeStore API) | ✅     |
| Responsive 1-2-3-4 col grid  | ✅     |
| Search by title              | ✅     |
| Category filter              | ✅     |
| Product detail page          | ✅     |
| Skeleton loaders             | ✅     |
| Error handling + retry       | ✅     |
| Infinite scroll (8/page)     | ✅     |
| Redux Toolkit (3 slices)     | ✅     |
| 27 unit tests (Jest)         | ✅     |
| TypeScript throughout        | ✅     |
| Mobile responsive            | ✅     |

---

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS · Redux Toolkit · Axios · jsonwebtoken · js-cookie · Jest ·
Lucide React

---
### Live Demo
https://shop-wav.vercel.app/
