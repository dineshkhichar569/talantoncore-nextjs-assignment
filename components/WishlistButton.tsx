"use client";
import { useEffect, useState } from "react";

export default function WishlistButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wishlist");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      setAdded(list.includes(slug));
    } catch {}
  }, [slug]);

  function toggle() {
    try {
      const raw = localStorage.getItem("wishlist");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      const next = added
        ? list.filter((s) => s !== slug)
        : Array.from(new Set([...list, slug]));
      localStorage.setItem("wishlist", JSON.stringify(next));
      setAdded(!added);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      className={`rounded-xl px-3 py-2 text-sm border ${
        added ? "bg-black text-white" : "bg-white"
      }`}
    >
      {added ? "Wishlisted ✓" : "Add to Wishlist"}
    </button>
  );
}
