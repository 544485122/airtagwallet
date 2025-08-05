import ContactForm from "@/components/common/contact-form";
import Header from "@/components/common/header";
import { contact } from "@/data/contact";

// Metadata
export const metadata = {
  title: contact.header.title,
  description: contact.header.description,
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
    "name": contact.header.title,
    "item": `${process.env.ROOT_URL}/contact`
  }]
};

export default function Contact({ data = contact }) {
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <Header data={data.header} />

      {/* Contact Section */}
      <section className="py-8 px-2">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Contact */}
            {data.contact.map((item, index) => (
              <div key={index} className="rounded-lg border">
                <div className="flex flex-col gap-4 p-6">
                  {item.icon}
                  <div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-base text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Map */}
            <div className="relative overflow-hidden rounded-lg col-span-1 md:col-span-2">
              <iframe src={data.map} className="absolute top-0 left-0 w-full h-full border-0" allowFullScreen="" loading="lazy"></iframe>
            </div>
            {/* Contact Form */}
            <div className="col-span-1 md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div >
      </section >
    </>
  );
};
