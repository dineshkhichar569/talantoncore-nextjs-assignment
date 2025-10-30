import { getAllProducts } from "@/lib/server/products";
import ProductList from "@/components/ProductList";

export const dynamic = "force-static";
export const revalidate = false;

export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold">NextStore</h1>
      <p className="mt-1 text-sm text-gray-600">
        Static product catalog rendered at build time. Client-side search &
        filtering included.
      </p>
      <div className="mt-6">
        <ProductList products={products} />
      </div>
    </main>
  );
}
