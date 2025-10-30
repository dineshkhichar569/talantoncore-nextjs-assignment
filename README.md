# 🛍️ NextStore — TalantonCore Next.js Assignment

### Author: **Dinesh Khichar**  
🎓 B.Tech CSE, DIT University  
📅 Submission Date: **31 October 2025**

---

## 📘 Project Overview
**NextStore** is a small e-commerce-style web application built using **Next.js (App Router + TypeScript)** as part of the **Full-Stack Development Internship Assignment** for **TalantonCore**.

The project demonstrates **different rendering strategies (SSG, ISR, SSR, CSR, and Server Components)** and uses **Next.js API routes** with a **mock JSON database** for full-stack functionality.

---

## 🚀 Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS  
- **Backend:** Next.js API Routes  
- **Database:** Local JSON file (`data/products.json`)  
- **Hosting Ready:** Vercel compatible  
- **Authentication:** Simple API key (`ADMIN_KEY`)  

---

## 🧱 Folder Structure
nextstore/
├── app/
│ ├── page.tsx → Home (SSG)
│ ├── products/[slug]/page.tsx → Product Details (ISR)
│ ├── dashboard/page.tsx → Inventory Dashboard (SSR)
│ ├── admin/page.tsx → Admin Panel (CSR)
│ └── recommendations/page.tsx → Recommendations (Server Components)
│
├── components/ → UI Components
├── lib/ → Helpers & server logic
├── data/products.json → Mock database
├── pages/api/products/ → API Routes (GET, POST, PUT)
├── .env.example → Environment variable template
└── README.md → Rendering strategy report

---

## ⚙️ Rendering Strategies Demonstrated

| Page | Route | Rendering Type | Description |
|------|--------|----------------|--------------|
| 🏠 Home | `/` | **SSG (Static Site Generation)** | Built once at deploy time with client-side search/filter |
| 📦 Product Detail | `/products/[slug]` | **ISR (Incremental Static Regeneration)** | Revalidates every 60 seconds |
| 📊 Inventory Dashboard | `/dashboard` | **SSR (Server-Side Rendering)** | Always fresh data from JSON |
| 🧑‍💻 Admin Panel | `/admin` | **CSR (Client-Side Rendering)** | Client-side fetch, form submission, localStorage for key |
| 💡 Recommendations | `/recommendations` | **Server Components + Client Interaction** | Hybrid RSC page + Wishlist button |

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/[slug]` | Get product by slug |
| POST | `/api/products` | Add new product *(admin key required)* |
| PUT | `/api/products/[id]` | Update product *(admin key required)* |

---

## 🗄️ Mock Database
File: `data/products.json`
```json
[
  { "id": "p-001", "name": "Next.js T-Shirt", "slug": "nextjs-tshirt", "price": 799, "inventory": 42 },
  { "id": "p-002", "name": "TypeScript Mug", "slug": "typescript-mug", "price": 499, "inventory": 18 }
]

