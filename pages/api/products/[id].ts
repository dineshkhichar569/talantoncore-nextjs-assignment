import type { NextApiRequest, NextApiResponse } from "next";
import path from "node:path";
import fs from "node:fs/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  const file = path.join(process.cwd(), "data", "products.json");

  if (req.method === "GET") {
    const products = JSON.parse(await fs.readFile(file, "utf-8"));
    const bySlug = products.find((p: any) => p.slug === id) || null;
    if (!bySlug) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(bySlug);
  }

  if (req.method === "PUT") {
    if (req.headers.authorization !== `Bearer ${process.env.ADMIN_KEY}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const updates = req.body as Partial<{
      price: number;
      inventory: number;
      description: string;
      name: string;
      category: string;
    }>;
    const products = JSON.parse(await fs.readFile(file, "utf-8"));
    const idx = products.findIndex((p: any) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const updated = {
      ...products[idx],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    products[idx] = updated;
    await fs.writeFile(file, JSON.stringify(products, null, 2));
    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
