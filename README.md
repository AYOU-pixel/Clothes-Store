# 👔 Clothes Store — Premium Full-Stack E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge&logo=vercel)](https://clothes-store-six-indol.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

> A modern fashion e-commerce experience inspired by brands like **ZARA** — built with **Next.js**, **MongoDB**, **Prisma**, and **Stripe**.  
> Designed for elegance, performance, and real-world scalability.

---

## 🌐 Live Demo
🛍️ **Experience it here →** [https://clothes-store-six-indol.vercel.app](https://clothes-store-six-indol.vercel.app)

---

## 🧭 Overview

This project is a **full-stack e-commerce website for clothes** that blends sleek design with robust backend functionality.  
Built over a month of dedicated research and development, it features secure authentication, media-rich product pages, a dynamic cart system, and smooth Stripe-powered payments — all wrapped in a clean, minimalist interface.

---

## ✨ Key Features

### 🛒 Core Shopping Experience
- 🧍‍♂️ **Category Pages**: Men, Women, Kids, Accessories  
- 🛍️ **Shopping Cart**: Add, remove, and manage products effortlessly  
- ❤️ **Wishlist**: Save items for later  
- 🔍 **Smart Search**: Real-time filtering and results  
- 🆕 **New Arrivals**: Automatically updates from seed data  

### 🖼️ Media & Design
- ☁️ **Cloudinary Integration** — lightning-fast image & video delivery  
- 🎥 **Video Support** — rich product previews  
- 🖌️ **Responsive Media Gallery** — optimized for all screen sizes  
- ⚡ **Performance** — Lazy loading + Next.js image optimization  
- ✨ **UI/UX** — Inspired by ZARA, powered by Tailwind + ShadCN UI  

### 👤 User Experience
- 🔐 **Secure Login** — Google & GitHub OAuth (NextAuth.js)  
- 🧾 **Profile Dashboard** — Manage orders, addresses, and wishlist  
- 📦 **Order Tracking** — Keep users informed at every step  
- 🧩 **Cookie & Privacy Pages** — Fully compliant with web standards  

### 💳 Payment & Checkout
- 💸 **Stripe Integration** — Real payment processing  
- 🔁 **Cart → Checkout Flow** — Seamless UX  
- 🧠 **Webhook Handling** — Order updates in real time  
- ✅ **PCI-Compliant Transactions** — Built for production readiness  

---

## 🧠 Tech Stack

| Layer | Technologies |
|:------|:--------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + ShadCN/UI |
| **Database** | MongoDB |
| **ORM** | Prisma |
| **Auth** | NextAuth.js (Google + GitHub) |
| **Payments** | Stripe |
| **Media** | Cloudinary |
| **Deployment** | Vercel |

---

## 🗂️ Project Structure

```
clothes-store/
├── app/                        # Next.js 14 App Router
│   ├── api/                   # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── cart/             # Cart management
│   │   ├── checkout/         # Payment processing
│   │   ├── search/           # Search functionality
│   │   ├── user/             # User operations
│   │   └── wishlist/         # Wishlist management
│   ├── [slug]/               # Dynamic product pages
│   ├── about/                # About page
│   ├── accessories/          # Accessories category
│   ├── cart/                 # Shopping cart
│   ├── editorial/            # Editorial content
│   ├── kids/                 # Kids category
│   ├── men/                  # Men's category
│   ├── women/                # Women's category
│   ├── new-arrivals/         # New products
│   ├── user/                 # User dashboard
│   │   ├── activity/         # Order history
│   │   ├── addresses/        # Address management
│   │   ├── orders/           # Order tracking
│   │   ├── settings/         # User settings
│   │   └── wishlist/         # Saved items
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global styles
│   └── Providers.tsx         # Context providers
├── components/                # React components
│   ├── Header/               # Navigation components
│   ├── ui/                   # shadcn/ui components
│   ├── ProductDetailsClient.tsx
│   ├── ProductImageGallery.tsx
│   ├── FeaturedProducts.tsx
│   └── ...                   # Other components
├── lib/                       # Utility functions
│   ├── auth.ts               # Auth configuration
│   ├── prisma.ts             # Prisma client
│   ├── utils.ts              # Helper functions
│   └── generated/            # Generated Prisma types
├── prisma/                    # Database schema
│   ├── schema.prisma         # Prisma schema
│   ├── seeds/                # Database seeders
│   │   ├── menProducts.ts
│   │   ├── womenProducts.ts
│   │   ├── kidsProducts.ts
│   │   ├── accessories.ts
│   │   └── ...
│   └── seed.ts               # Seed script
└── public/                    # Static assets
```

---

## ⚙️ Getting Started

### 🧩 Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe & Cloudinary accounts
- Google/GitHub OAuth credentials (optional for login)

### 📦 Installation

```bash
git clone https://github.com/AYOU-pixel/Clothes-Store
cd clothes-store
npm install
```

### 🧾 Setup Environment

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Then add your credentials (see next section).

### 🗃️ Database Initialization

```bash
npx prisma generate
npx prisma db push
npm run seed   # optional: seed initial data
```

### 🧠 Run the App

```bash
npm run dev
```

Now open 👉 http://localhost:3000

---

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/clothes-store"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"
```


---

## 🧾 Database Schema

Core entities managed by Prisma + MongoDB:

- **User** — Account details & sessions
- **Product** — Items in catalog  
- **Category** — Men, Women, Kids, Accessories
- **Cart** — Current cart session
- **Wishlist** — Saved items
- **Order** — Purchase records
- **Address** — Shipping info

See full schema in `prisma/schema.prisma`

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|:---------|:-------|:------------|
| `/api/auth/[...nextauth]` | GET/POST | Authentication routes |
| `/api/cart` | GET/POST/DELETE | Manage cart items |
| `/api/checkout` | POST | Stripe payment flow |
| `/api/search` | GET | Product search |
| `/api/user/update` | PUT | Update user data |
| `/api/wishlist` | GET/POST/DELETE | Wishlist operations |

---

## 💳 Stripe Integration

- One-click checkout experience
- Real-time order tracking through webhooks
- Secure card payments & digital wallets
- Seamless integration with the cart flow
- Full PCI compliance out-of-the-box

---

## ☁️ Deployment (Vercel)

Push your code:

```bash
git push origin main
```

Go to Vercel Dashboard, import the repo

Add your `.env` variables in "Environment Variables" section

Deploy → done 🎉

**Optional:**
- Connect a custom domain
- Configure Stripe Webhooks

---

## 🎨 Customization

- **Styling** → `globals.css` or `tailwind.config.ts`
- **UI Components** → `components/ui/`
- **Data Seeds** → `prisma/seeds/`
- **Routes & APIs** → `app/api/`

---

## 🤝 Contributing

Pull requests, feature suggestions, and improvements are welcome!  
To contribute:

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a PR 🎉

---

## 👨‍💻 Author

Developed with ❤️ by **Ayoub**

> "Elegance in code, like in fashion, lies in simplicity, structure, and flow."
