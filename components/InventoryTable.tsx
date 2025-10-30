import type { Product } from "@/models/Product";
import { formatINR } from "@/lib/format";

export default function InventoryTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Category</th>
            <th className="py-2 pr-4">Price</th>
            <th className="py-2 pr-4">Inventory</th>
            <th className="py-2 pr-4">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2 pr-4">{p.name}</td>
              <td className="py-2 pr-4">{p.category}</td>
              <td className="py-2 pr-4">{formatINR(p.price)}</td>
              <td className="py-2 pr-4">{p.inventory}</td>
              <td className="py-2 pr-4">
                {new Date(p.lastUpdated).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
