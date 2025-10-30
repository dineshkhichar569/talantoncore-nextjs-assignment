"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/models/Product";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | "Apparel" | "Accessories">("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const okCat = cat === "All" || p.category === cat;
      const okQ =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return okCat && okQ;
    });
  }, [q, cat, products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="w-full sm:w-2/3 rounded-xl border px-3 py-2 outline-none focus:ring-2"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as any)}
          className="w-full sm:w-1/3 rounded-xl border px-3 py-2"
        >
          <option>All</option>
          <option>Apparel</option>
          <option>Accessories</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">
          No results. Try a different search.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
