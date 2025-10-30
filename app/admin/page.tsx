"use client";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/models/Product";
import AdminForm from "@/components/AdminForm";
import { formatINR } from "@/lib/format";

export default function AdminPage() {
  const base = process.env.NEXT_PUBLIC_API_URL || "/api";
  const [adminKey, setAdminKey] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch(`${base}/products`);
    const data = (await res.json()) as Product[];
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const k = localStorage.getItem("adminKey");
    if (k) setAdminKey(k);
  }, []);

  useEffect(() => {
    if (adminKey) localStorage.setItem("adminKey", adminKey);
  }, [adminKey]);

  const lowStock = useMemo(
    () => products.filter((p) => (p.inventory ?? 0) < 10).length,
    [products]
  );

  function onSaved(updated: Product) {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      if (idx === -1) return [updated, ...prev];
      const next = [...prev];
      next[idx] = updated;
      return next;
    });
    setSelected(null);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
      <p className="mt-1 text-sm text-gray-600">
        Client-side fetching & forms. POST/PUT are protected with a simple key.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="password"
          placeholder="Admin key (Bearer)"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          className="rounded-xl border px-3 py-2 w-72"
        />
        <button onClick={load} className="rounded-xl border px-3 py-2">
          Refresh
        </button>
      </div>

      <section className="mt-6">
        <div className="rounded-2xl border p-4">
          <div className="mb-2 text-lg font-semibold">
            {selected ? `Edit: ${selected.name}` : "Create New Product"}
          </div>
          <AdminForm
            selected={selected}
            onSaved={onSaved}
            adminKey={adminKey}
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="rounded-2xl border">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="text-sm text-gray-600">
              Products ({products.length}) • Low stock: {lowStock}
            </div>
            {loading ? <div className="text-sm">Loading…</div> : null}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left border-b">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Slug</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Inventory</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-3 py-2 font-medium">{p.name}</td>
                    <td className="px-3 py-2">{p.slug}</td>
                    <td className="px-3 py-2">{p.category}</td>
                    <td className="px-3 py-2">{formatINR(p.price)}</td>
                    <td className="px-3 py-2">{p.inventory}</td>
                    <td className="px-3 py-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() => setSelected(p)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
