"use client";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/models/Product";

export default function AdminForm({
  selected,
  onSaved,
  adminKey,
}: {
  selected?: Product | null;
  onSaved: (p: Product) => void;
  adminKey: string;
}) {
  const [form, setForm] = useState<Partial<Product>>({});
  const isEdit = !!selected?.id;

  useEffect(() => {
    setForm(selected ?? {});
  }, [selected]);

  const canSubmit = useMemo(() => {
    if (!form) return false;
    const baseOk =
      !!form.name &&
      !!form.slug &&
      !!form.price &&
      !!form.category &&
      form.inventory !== undefined;
    return baseOk;
  }, [form]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const base = process.env.NEXT_PUBLIC_API_URL || "/api";

    if (isEdit && selected) {
      const res = await fetch(`${base}/products/${selected.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          inventory: Number(form.inventory),
        }),
      });
      if (!res.ok) {
        alert("Update failed");
        return;
      }
      const saved = (await res.json()) as Product;
      onSaved(saved);
      return;
    }

    const newProduct: Product = {
      id: `p-${Math.random().toString(36).slice(2, 7)}`,
      name: String(form.name || ""),
      slug: String(form.slug || ""),
      description: String(form.description || ""),
      price: Number(form.price || 0),
      category: String(form.category || "General"),
      inventory: Number(form.inventory || 0),
      lastUpdated: new Date().toISOString(),
    };

    const res = await fetch(`${base}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      alert("Create failed");
      return;
    }
    onSaved(newProduct);
    setForm({});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Name"
          value={form.name ?? ""}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
        />
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Slug (unique)"
          value={form.slug ?? ""}
          onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
        />
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Category"
          value={form.category ?? ""}
          onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
        />
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Price"
          type="number"
          value={form.price ?? ""}
          onChange={(e) =>
            setForm((s) => ({ ...s, price: e.target.valueAsNumber }))
          }
        />
        <input
          className="rounded-xl border px-3 py-2"
          placeholder="Inventory"
          type="number"
          value={form.inventory ?? ""}
          onChange={(e) =>
            setForm((s) => ({ ...s, inventory: e.target.valueAsNumber }))
          }
        />
        <input
          className="rounded-xl border px-3 py-2 sm:col-span-2"
          placeholder="Description"
          value={form.description ?? ""}
          onChange={(e) =>
            setForm((s) => ({ ...s, description: e.target.value }))
          }
        />
      </div>
      <button
        disabled={!canSubmit}
        className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {isEdit ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
