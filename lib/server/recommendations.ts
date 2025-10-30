import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/models/Product";

export async function getRecommendedProducts(limit = 4): Promise<Product[]> {
  const file = path.join(process.cwd(), "data", "products.json");
  const raw = await fs.readFile(file, "utf-8");
  const products = JSON.parse(raw) as Product[];
  const scored = products
    .map((p) => ({
      p,
      score:
        (p.inventory > 0 ? 10 : -10) + new Date(p.lastUpdated).getTime() / 1e11,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
  return scored;
}
