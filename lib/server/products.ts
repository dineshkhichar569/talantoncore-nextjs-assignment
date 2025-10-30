import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/models/Product";

export async function getAllProducts(): Promise<Product[]> {
  const file = path.join(process.cwd(), "data", "products.json");
  const raw = await fs.readFile(file, "utf-8");
  const items = JSON.parse(raw) as Product[];
  return items.sort((a, b) => a.name.localeCompare(b.name));
}
