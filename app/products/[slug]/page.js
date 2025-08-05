import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/common/header";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { product } from "@/data/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

// Get Header Info
const headerInfo = (slug) => products.products.find(product => slugify(product.title, { lower: true, strict: true }) === slug);

// Metadata
export async function generateMetadata({ params }) {
  const header = headerInfo(params.slug);
  if (!header) notFound();
  return {
    title: header.title,
    description: header.description
  };
};

export default function Product({ params, searchParams }) {
  // Get Banner Header Info
  const header = headerInfo(params.slug);
  if (!header) notFound();

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
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": header.title,
      "item": `${process.env.ROOT_URL}/products/${params.slug}`
    }]
  };

  // Filter Product Data
  const productArray = product.filter(item => item.category === header.title).map(item => ({
    image: item.image,
    category: item.category,
    title: item.title,
    description: item.description
  }));

  // Pagination
  const itemsPerPage = 32;
  const maxPageNumbers = 5;
  const page = Math.max(1, parseInt(searchParams.page, 10) || 1);
  const totalPages = Math.ceil(productArray.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const productsPage = productArray.slice(startIndex, startIndex + itemsPerPage);
  const prevPage = Math.max(1, page - 1);
  const nextPage = page + 1;
  const isPageOutOfRange = page > totalPages;
  const startPage = Math.max(1, Math.min(
    page - Math.floor(maxPageNumbers / 2),
    totalPages - maxPageNumbers + 1
  ));
  const pageNumbers = Array.from(
    { length: Math.min(maxPageNumbers, totalPages - startPage + 1) },
    (_, i) => startPage + i
  );

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Banner Header */}
      <Header data={header} />

      {/* Product Collection */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          {/* Products */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {productsPage.map((item, index) => (
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

          {/* Pagination */}
          {!isPageOutOfRange ? (
            <Pagination className="mt-8">
              <PaginationContent className="w-full">
                <PaginationItem><PaginationPrevious href={page !== 1 ? `?page=${prevPage}` : undefined} aria-disabled={page === 1} /></PaginationItem>
                {pageNumbers.map(pageNumber => (
                  <PaginationItem key={pageNumber}><PaginationLink href={`?page=${pageNumber}`} isActive={page === pageNumber}>{pageNumber}</PaginationLink></PaginationItem>
                ))}
                <PaginationItem><PaginationNext href={page !== totalPages ? `?page=${nextPage}` : undefined} aria-disabled={page === totalPages} /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : (
            notFound()
          )}
        </div>
      </section>
    </>
  );
};
