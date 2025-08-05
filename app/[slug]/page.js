import { BookText, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { blog } from "@/data/blog";
import { basic } from "@/data/basic";
import Image from "next/image";
import Link from "next/link";

// Get Blog Info
const blogInfo = (slug) => blog.blogs.find(blog => blog.slug === slug);

// Metadata
export async function generateMetadata({ params }) {
  const blog = blogInfo(params.slug);
  if (!blog) {
    return {
      title: "Not Found",
      description: "Blog info not found",
    };
  }
  return {
    title: blog.title,
    description: blog.description,
  };
};

export default function Blog({ params }) {
  const details = blogInfo(params.slug);
  if (!details) notFound();

  // Structured Data
  const jsonLd = [{
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
      "name": details.title,
      "item": `${process.env.ROOT_URL}/${details.slug}`
    }]
  }, {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": details.title,
    "description": details.description,
    "image": details.image,
    "author": {
      "@type": "Person",
      "name": basic.author.name,
      "url": `${process.env.ROOT_URL}/about`
    }
  }];

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Blog Details */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Area */}
            <div className="space-y-8 lg:col-span-2">

              {/* Banner Image */}
              <div className="relative">
                <Image src={details.image} alt={details.title} className="w-full rounded-lg" width={1024} height={600} />
                <div className="absolute flex left-5 bottom-5 gap-4">
                  <Badge variant="outline" className="gap-2 bg-primary-foreground"><BookText className="w-4" />{details.category}</Badge>
                  <Badge variant="outline" className="gap-2 bg-primary-foreground"><Calendar className="w-4" />{details.date.split(' ')[0]}</Badge>
                </div>
              </div>

              {/* Blog Content */}
              <article className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold">{details.title}</h1>
                {details.content && (details.content.split("\n").map((line, index) => {
                  line = line.trim();
                  if (line.startsWith("## ")) {
                    return <h2 key={index} id={line.slice(3).toLowerCase().replace(/\s+/g, '-')} className="text-xl md:text-2xl font-semibold scroll-mt-24">{line.slice(3)}</h2>;
                  } else if (line.startsWith("### ")) {
                    return <h3 key={index} id={line.slice(4).toLowerCase().replace(/\s+/g, '-')} className="text-lg md:text-xl font-semibold scroll-mt-24">{line.slice(4)}</h3>;
                  } else if (line.startsWith("![")) {
                    const match = line.split('](');
                    if (match.length === 2) {
                      return <Image key={index} src={match[1].slice(0, -1)} alt={match[0].slice(2)} className="w-full rounded-lg" width={800} height={500} />;
                    }
                  } else if (!line.startsWith("![") && line.includes("](")) {
                    const parts = line.split(/(\[.*?\]\(.*?\))/);
                    return (
                      <p key={index} className="text-base text-muted-foreground leading-relaxed">
                        {parts.map((part, i) => {
                          const linkRegex = /\[(.*?)\]\((.*?)\)/g;
                          let lastIndex = 0;
                          const elements = [];
                          let match;
                          while ((match = linkRegex.exec(part)) !== null) {
                            if (match.index > lastIndex) {
                              elements.push(part.slice(lastIndex, match.index));
                            }
                            elements.push(<Link key={`${i}-${elements.length}`} href={match[2]} className="text-blue-500 hover:underline" target="_blank">{match[1]}</Link>);
                            lastIndex = linkRegex.lastIndex;
                          }
                          if (lastIndex < part.length) {
                            elements.push(part.slice(lastIndex));
                          }
                          return elements.length > 0 ? elements : part;
                        })}
                      </p>
                    );
                  } else if (line !== "") {
                    return <p key={index} className="text-base text-muted-foreground leading-relaxed">{line}</p>;
                  }
                }))}
              </article>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-8">
              {/* Recommended Reading */}
              <div className="flex flex-col rounded-lg border border-border p-6 space-y-4">
                <div className="text-lg font-medium leading-relaxed">Recommended Reading</div>
                {[...blog.blogs].reverse()
                  .filter(item => item.category === details.category && item.slug !== details.slug)
                  .slice(0, 10)
                  .map((item, index) => (
                    <div key={index} className="flex rounded-lg border">
                      <div className="w-36 h-24 flex-shrink-0">
                        <Link href={`/${item.slug}`} target="_blank">
                          <Image src={item.image} alt={item.title} className="w-full h-full object-cover rounded-l-lg" width={96} height={96} />
                        </Link>
                      </div>
                      <div className="px-4 py-2">
                        <Link href={`/${item.slug}`} target="_blank">
                          <h3 className="text-sm font-medium">{item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title}</h3>
                        </Link>
                        <span className="text-xs text-muted-foreground">{item.date.split(' ')[0]}</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Recent Posts */}
              <div className="flex flex-col rounded-lg border border-border p-6 space-y-4">
                <div className="text-lg font-medium leading-relaxed">Recent Posts</div>
                {[...blog.blogs].reverse().filter(item => item.slug !== details.slug).slice(0, 16).map((item, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <Link href={`/${item.slug}`} className="hover:underline" target="_blank">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.category}</span>
                      <span>{item.date.split(' ')[0]}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* About Author */}
              <div className="flex flex-col rounded-lg border border-border p-6 space-y-4">
                <div className="text-lg font-medium leading-relaxed">About Author</div>
                <div className="flex flex-col items-center text-center gap-4">
                  <Image src={basic.author.image} className="rounded-full" alt={basic.author.name} width={100} height={100} />
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">{basic.author.name}</div>
                    <div className="text-sm text-muted-foreground">{basic.author.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
