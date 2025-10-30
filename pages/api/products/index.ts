import type { NextApiRequest, NextApiResponse } from "next";
import path from "node:path";
import fs from "node:fs/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const file = path.join(process.cwd(), "data", "products.json");

  if (req.method === "GET") {
    const raw = await fs.readFile(file, "utf-8");
    const products = JSON.parse(raw);
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    if (req.headers.authorization !== `Bearer ${process.env.ADMIN_KEY}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const body = req.body;
    const raw = await fs.readFile(file, "utf-8");
    const products = JSON.parse(raw);
    products.push(body);
    await fs.writeFile(file, JSON.stringify(products, null, 2));
    return res.status(201).json({ ok: true });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
