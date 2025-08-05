import Header from "@/components/common/header";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

// Metadata
export const metadata = {
  title: products.header.title,
  description: products.header.description,
};

// Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": `${process.env.ROOT_URL}`
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Products Collection",
    "item": `${process.env.ROOT_URL}/products`
  }]
};

export default function Products() {
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header */}
      <Header data={products.header} />
      {/* Products Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.products.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <Link href={`/products/${slugify(item.title, { lower: true, strict: true })}`} target="_blank">
                  <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={800} height={500} />
                </Link>
                <div className="p-4 space-y-2">
                  <Link href={`/products/${slugify(item.title, { lower: true, strict: true })}`} target="_blank">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </Link>
                  <p className="text-base text-muted-foreground">{item.description.length > 240 ? `${item.description.substring(0, 240)}...` : item.description}</p>
                  <Link href={`/products/${slugify(item.title, { lower: true, strict: true })}`} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank">Read More <ChevronRight className="w-4" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
