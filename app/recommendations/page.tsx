import { getRecommendedProducts } from "@/lib/server/recommendations";
import { formatINR } from "@/lib/format";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";

export const revalidate = 300;

export default async function RecommendationsPage() {
  const items = await getRecommendedProducts(6);
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Recommended for You</h1>
      <p className="mt-1 text-sm text-gray-600">
        Server Components fetch on the server • Client-side wishlist button for
        interactivity.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="rounded-2xl border p-4">
            <div className="text-lg font-semibold">{p.name}</div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {p.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold">{formatINR(p.price)}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  p.inventory < 10
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {p.inventory < 10 ? "Low stock" : "In stock"}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link href={`/products/${p.slug}`} className="underline">
                View →
              </Link>
              <WishlistButton slug={p.slug} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
