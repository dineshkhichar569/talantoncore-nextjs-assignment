# 🛍️ NextStore — TalantonCore Next.js Assignment

### 👨‍💻 Author: **Dinesh Khichar**  
🎓 B.Tech CSE | DIT University  
📍 Sikar, Rajasthan, India  
📅 Submission Date: **31 October 2025**  
📧 [dinesh.khichar.work@gmail.com](mailto:dinesh.khichar.work@gmail.com)  
🌐 [dineshportfolios.site](https://dineshportfolios.site) • 💻 [GitHub](https://github.com/dineshkhichar569)

---

## 🚀 Project Overview

**NextStore** is a feature-rich, full-stack e-commerce web application built using **Next.js (App Router + TypeScript)**.  
It was developed as part of the **Full-Stack Development Internship Assignment** for **TalantonCore** to demonstrate mastery over modern rendering patterns, full-stack integration, and scalable app architecture.

The project implements **five rendering strategies** — **SSG, ISR, SSR, CSR, and Server Components** — along with a working **mock backend API** and **admin functionality**.

---

## ⚙️ Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | Next.js 14 (App Router), React, TypeScript, TailwindCSS |
| **Backend** | Next.js API Routes |
| **Database** | Local JSON file (`data/products.json`) |
| **Authentication** | API Key (`ADMIN_KEY`) for protected routes |
| **Hosting Ready** | Vercel (Optimized for deployment) |

---

## 🧱 Folder Structure

```bash
nextstore/
├── app/
│   ├── page.tsx → Home (SSG)
│   ├── products/[slug]/page.tsx → Product Details (ISR)
│   ├── dashboard/page.tsx → Inventory Dashboard (SSR)
│   ├── admin/page.tsx → Admin Panel (CSR)
│   └── recommendations/page.tsx → Recommendations (Server Components)
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

---

## ✨ Key Features

- 🧩 **Dynamic Product Catalog** — Browse, search, and filter products (SSG + Client Search)
- ⚙️ **Product Details Page** — Auto-refreshing ISR pages every 60 seconds
- 📊 **Live Dashboard** — Real-time inventory stats (SSR)
- 🧑‍💻 **Admin Panel** — Create & update products (CSR + API key auth)
- 💡 **Recommendations Page** — Server Components + interactive Wishlist button
- 📁 **Mock Database** — JSON-based backend with Next.js API routes
- 🚀 **Fully typed** with TypeScript and TailwindCSS styling
---

---
## 🧩 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/dineshkhichar569/talantoncore-nextjs-assignment.git
   cd talantoncore-nextjs-assignment

2. **Install dependencies
   ```bash
   npm install

3. **Start the development server 
    ```bash
    npm run dev


---
