import type { Product } from "@/models/Product";
import Stat from "@/components/Stat";
import InventoryTable from "@/components/InventoryTable";
import path from "node:path";
import fs from "node:fs/promises";
import { formatINR } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getLiveProducts(): Promise<Product[]> {
  const file = path.join(process.cwd(), "data", "products.json");
  const raw = await fs.readFile(file, "utf-8");
  const items = JSON.parse(raw) as Product[];
  return items;
}

export default async function DashboardPage() {
  const products = await getLiveProducts();

  const totalProducts = products.length;
  const totalUnits = products.reduce((s, p) => s + p.inventory, 0);
  const totalValue = products.reduce((s, p) => s + p.price * p.inventory, 0);
  const lowStock = products.filter((p) => p.inventory < 10);
  const recent = [...products]
    .sort((a, b) => +new Date(b.lastUpdated) - +new Date(a.lastUpdated))
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Inventory Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Server-Side Rendered every request — always fresh.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Products" value={totalProducts} />
        <Stat label="Total Units" value={totalUnits} />
        <Stat label="Inventory Value" value={formatINR(totalValue)} />
        <Stat
          label="Low Stock Items"
          value={lowStock.length}
          hint="(<10 units)"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Recently Updated</h2>
        <InventoryTable products={recent} />
      </section>

      {lowStock.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
          <InventoryTable products={lowStock} />
        </section>
      )}
    </main>
  );
}
