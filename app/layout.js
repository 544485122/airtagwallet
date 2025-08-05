import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import CTA from "@/components/common/cta";
import Footer from "@/components/common/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });
export const runtime = "edge"

export const metadata = {
  title: {
    default: "B",
    template: "%s - B",
  },
  description: "B",
  openGraph: {
    title: "B",
    description: "B",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "B",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "B",
      template: "%s - B",
    },
    description: "B",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "B",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <CTA />
        <Footer />
        <ScrollToTop />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
};
