import ContactForm from '@/components/common/contact-form';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { notFound } from "next/navigation";
import { product } from "@/data/product";
import slugify from "slugify";
// Get Product Info
const findProduct = (slug) => product.find(item => slugify(item.title, { lower: true, strict: true }) === slug);

// Metadata
export async function generateMetadata({ params }) {
  const productItem = findProduct(params.slug);
  if (!productItem) notFound();
  return {
    title: productItem.title,
    description: productItem.description
  };
}

export default function Product({ params }) {
  // Get Product Info
  const productItem = findProduct(params.slug);
  if (!productItem) notFound();

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
      "name": "Product",
      "item": `${process.env.ROOT_URL}/product`
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": productItem.title,
      "item": `${process.env.ROOT_URL}/product/${slugify(productItem.title, { lower: true, strict: true })}`
    }]
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Product Details */}
      <section className="py-8 px-2">
        <div className="container mx-auto space-y-8">
          {/* Title & Desc */}
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold lg:text-4xl">{productItem.title}</h1>
            <p className="max-w-4xl text-muted-foreground text-lg">{productItem.description}</p>
          </div>

          {/* Images */}
          <div className="grid gap-4 md:grid-cols-2">
            <Image src={productItem.image} alt={productItem.title} className="w-full border border-border rounded-lg h-full" width={800} height={600} />
            <div className="grid gap-4 md:grid-cols-2">
              {productItem.images.map((image, index) => (
                <Image key={index} src={image} alt={productItem.title} className="w-full border border-border rounded-lg" width={400} height={300} />
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-full">
                {productItem.features.map((feature, index) => (
                  <div key={index} className="flex flex-col gap-2 border border-border rounded-lg p-8 bg-accent">
                    <ArrowDownRight className="size-6" />
                    <h3 className="font-medium text-lg">{feature.title}</h3>
                    <p className="text-base text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div><ContactForm /></div>
          </div>

          {/* Related Products */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold lg:text-2xl">Recommended Products</h2>
            <p className="max-w-4xl text-muted-foreground text-base">Stacker makes it easy to build customer portals, CRMs, internal tools, and other business applications for your team. In minutes, not months.</p>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {product.filter(item => item.title !== productItem.title).sort(() => 0.5 - Math.random()).slice(0, 8).map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link href={`/product/${slugify(item.title, { lower: true, strict: true })}`} target="_blank"><Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={400} height={300} /></Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">
                    <Link href={`/products/${slugify(item.category, { lower: true, strict: true })}`} target="_blank">{item.category}</Link>
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={`/product/${slugify(item.title, { lower: true, strict: true })}`} target="_blank"><h3 className="text-lg font-semibold">{item.title}</h3></Link>
                  <p className="text-base text-muted-foreground">{item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description}</p>
                  <Link href={`/product/${slugify(item.title, { lower: true, strict: true })}`} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank">Learn More <ChevronRight className="w-4" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
