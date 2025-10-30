import type { Product } from "@/models/Product";
import { formatINR } from "@/lib/format";
import Link from "next/link";

export const revalidate = 60;

export async function generateStaticParams() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const file = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(await fs.readFile(file, "utf-8")) as Product[];
  return products.map((p) => ({ slug: p.slug }));
}

async function getProduct(slug: string): Promise<Product | null> {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const res = await fetch(`${base}/products/${slug}`, { next: { revalidate } });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/" className="mt-6 inline-block underline">
          ← Back to catalog
        </Link>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="text-sm underline">
        ← Back
      </Link>
      <h1 className="mt-3 text-2xl sm:text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-xl font-semibold">
          {formatINR(product.price)}
        </span>
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
      <div className="mt-6 text-xs text-gray-500">
        Last updated: {new Date(product.lastUpdated).toLocaleString()}
      </div>
    </main>
  );
}
