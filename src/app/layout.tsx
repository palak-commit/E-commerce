import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema-org";

// metadataBase makes every relative canonical/og URL resolve to the real origin.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Fashion, Buyer-First`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Shop men's and women's fashion. Jackets, hoodies, kurtis, sneakers and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Site-wide structured data lives in the layout so every page inherits it. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <header className="border-b border-zinc-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold">
              {SITE_NAME}
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/men-jackets">Men</Link>
              <Link href="/women-kurti">Women</Link>
              <Link href="/best-men-winter-jackets">Collections</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
        <footer className="mt-12 border-t border-zinc-200">
          <div className="mx-auto max-w-6xl p-4 text-sm text-zinc-500">
            © {SITE_NAME}. Built for buyer-intent search.
          </div>
        </footer>
      </body>
    </html>
  );
}
