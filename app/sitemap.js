import { products } from "@/data/products";
import { product } from "@/data/product";
import { blog } from "@/data/blog";
import slugify from "slugify";

const productsArray = products.products.map(product => ({
  url: `${process.env.ROOT_URL}/products/${slugify(product.title, { lower: true, strict: true })}`,
  lastModified: new Date().toISOString(),
  changeFrequency: "monthly",
  priority: 0.8,
}));

const productArray = product.map(product => ({
  url: `${process.env.ROOT_URL}/product/${slugify(product.title, { lower: true, strict: true })}`,
  lastModified: new Date().toISOString(),
  changeFrequency: "monthly",
  priority: 0.8,
}));

const blogsArray = blog.blogs.map(blog => ({
  url: `${process.env.ROOT_URL}/${blog.slug}`,
  lastModified: new Date(blog.date).toISOString(),
  changeFrequency: "monthly",
  priority: 0.8,
}));

export default function sitemap() {
  return [
    {
      url: `${process.env.ROOT_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${process.env.ROOT_URL}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...productsArray,
    ...productArray,
    {
      url: `${process.env.ROOT_URL}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogsArray,
    {
      url: `${process.env.ROOT_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${process.env.ROOT_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    }
  ];
};
