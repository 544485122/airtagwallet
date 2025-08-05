import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/common/header";
import { CheckCircle } from 'lucide-react';
import Image from "next/image";
import { about } from "@/data/about";

// Metadata
export const metadata = {
  title: about.header.title,
  description: about.header.description,
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
    "name": about.header.title,
    "item": `${process.env.ROOT_URL}/about`
  }]
};

export default function About({ data = about }) {
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <Header data={data.header} />

      {/* Our Story */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-medium lg:text-2xl">{data.intro.title}</h3>
              {data.intro.descriptions.map((description, index) => (
                <p key={index} className="text-base text-muted-foreground">{description}</p>
              ))}
              <ul className="space-y-2">
                {data.intro.features.map((feature, index) => (
                  <li key={index} className="flex gap-x-2"><CheckCircle className="mt-1 size-4 shrink-0" /><p className="text-base text-muted-foreground">{feature}</p></li>
                ))}
              </ul>
            </div>
            <Image src={data.intro.image} className="rounded-lg" alt={data.intro.title} width={800} height={600} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, index) => (
              <div key={index} className="flex gap-4 border border-border rounded-lg p-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">{feature.icon}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data.gallery.map((image, index) => (
              <Image key={index} src={image.image} alt={image.alt} className="size-full rounded-lg" width={400} height={300} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="px-6 pt-6 leading-7 text-foreground/70"><q>{testimonial.description}</q></CardContent>
                <CardFooter>
                  <div className="flex gap-4 leading-5">
                    <Avatar className="size-12 rounded-full ring-1 ring-input"><AvatarImage src={testimonial.image} alt={testimonial.name} /></Avatar>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
