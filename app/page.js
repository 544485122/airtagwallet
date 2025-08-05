import Hero from "@/components/common/hero";
import ThreeColumn from "@/components/common/three-column";
import ThreeLinkColumn from "@/components/common/three-link-column";
import FourColumn from "@/components/common/four-column";
import FourLinkColumn from "@/components/common/four-link-column";
import TwoColumn from "@/components/common/two-column";
import FAQ from "@/components/common/faq";
import Testimonials from "@/components/common/testimonials";
import Contact from "@/components/common/contact";
import { home } from "@/data/home";

// Metadata
export const metadata = {
  title: "Airtag Wallet",
  description: "Discover a wide range of products for all your needs, from clothing to electronics, and more."
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
  }]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {home.hero && <Hero data={home.hero} />}
      {home.categories && <ThreeLinkColumn data={home.categories} />}
      {home.products && <FourLinkColumn data={home.products} />}
      {home.options && <ThreeColumn data={home.options} />}
      {home.process && <ThreeColumn data={home.process} />}
      {home.environment && <FourColumn data={home.environment} />}
      {home.why && <FourColumn data={home.why} />}
      {home.about && <TwoColumn data={home.about} />}
      {home.faq && <FAQ data={home.faq} />}
      {home.testimonials && <Testimonials data={home.testimonials} />}
      {home.contact && <Contact data={home.contact} />}
    </>
  );
}
