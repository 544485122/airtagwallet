import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/common/header";
import { ChevronRight } from "lucide-react";
import { blog } from "@/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Metadata
export const metadata = {
  title: blog.header.title,
  description: blog.header.description,
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
    "name": "Our Blog",
    "item": `${process.env.ROOT_URL}/blog`
  }]
};

export default function Blog({ searchParams }) {
  // Get Blogs Data
  const blogs = [...blog.blogs].reverse().map(blog => ({
    image: blog.image,
    category: blog.category,
    title: blog.title,
    slug: blog.slug,
    description: blog.description
  }));

  // Pagination
  const itemsPerPage = 4;
  const maxPageNumbers = 5;
  const page = Math.max(1, parseInt(searchParams.page, 10) || 1);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const blogsData = blogs.slice(startIndex, startIndex + itemsPerPage);
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

      {/* Header */}  
      <Header data={blog.header} />

      {/* Blogs List */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          {/* Blogs */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {blogsData.map((item, index) => (
              <div key={index} className="rounded-lg border h-full">
                <div className="relative">
                  <Link href={`/${item.slug}`} target="_blank">
                    <Image src={item.image} alt={item.title} className="w-full rounded-t-lg" width={1024} height={600} />
                  </Link>
                  <Badge variant="outline" className="absolute left-5 top-5 bg-primary-foreground">{item.category}</Badge>
                </div>
                <div className="p-4 space-y-2">
                  <Link href={`/${item.slug}`} target="_blank"><h3 className="text-lg font-semibold">{item.title}</h3></Link>
                  <p className="text-base text-muted-foreground">{item.description}</p>
                  <Link href={`/${item.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground" target="_blank">Learn More <ChevronRight className="w-4" /></Link>
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
