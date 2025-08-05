export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${process.env.ROOT_URL}/sitemap.xml`,
  };
}
