import type { Metadata } from "next";
import Link from "next/link";
import Menu from "@/components/Menu";
import Analytics from "@/components/Analytics";
import { SITE } from "@/lib/content";
import { groups } from "@/lib/editorial";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "KritRNA | Translation biology", template: "%s | KritRNA" },
  description: "KritRNA researches suppressor tRNA in Noida, India.",
  icons: { icon: "/favicon.png" },
  openGraph: { siteName: "KritRNA", type: "website", images: ["/api/og"] },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KritRNA",
    legalName: SITE.legal,
    url: SITE.url,
    logo: SITE.url + "/kritrna-mark.png",
    email: SITE.email,
  };
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Menu />
        <main id="main">{children}</main>
        <footer>
          <div className="foot-brand">KritRNA™</div>
          <div className="foot-links">
            {groups.map((g) => (
              <Link key={g.path} href={g.path}>
                {g.name}
              </Link>
            ))}
            <Link href="/search">Search</Link>
            <Link href="/ask">Ask KritRNA</Link>
          </div>
          <div className="foot-details">
            <p>
              {SITE.legal}
              <br />
              CIN {SITE.cin}
              <br />
              {SITE.location}
            </p>
            <p>
              <a href={"mailto:" + SITE.email}>{SITE.email}</a>
              <br />
              <a href={"mailto:" + SITE.careersEmail}>{SITE.careersEmail}</a>
              <br />
              <a href="tel:+918595898238">{SITE.phone}</a>
            </p>
            <p>
              {["privacy", "terms", "disclaimer", "references"].map((x) => (
                <Link key={x} href={"/" + x}>
                  {x[0].toUpperCase() + x.slice(1)}{" "}
                </Link>
              ))}
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
