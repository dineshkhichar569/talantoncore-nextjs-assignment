"use client";
import Link from "next/link";
import type { Product } from "@/models/Product";
import { formatINR } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="mb-3 text-lg font-semibold">{product.name}</div>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold">{formatINR(product.price)}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            product.inventory < 10
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {product.inventory < 10 ? "Low stock" : "In stock"}
        </span>
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="mt-4 inline-block text-primary underline"
      >
        View details →
      </Link>
    </div>
  );
}
