import './globals.css';
import Link from 'next/link';


export const metadata = {
title: 'NextStore',
description: 'E-commerce demo using Next.js rendering strategies',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-dvh bg-white text-gray-900">
<header className="border-b">
<nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
<Link href="/" className="font-semibold">NextStore</Link>
<div className="text-sm text-gray-600 flex gap-4">
<Link href="/dashboard">Dashboard (SSR)</Link>
<Link href="/admin">Admin (CSR)</Link>
<Link href="/recommendations">Recommendations (RSC)</Link>
</div>
</nav>
</header>
{children}
</body>
</html>
);
}