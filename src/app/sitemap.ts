import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://deyopticals.com';
  
  // Static Routes
  const routes = [
    '',
    '/products',
    '/home-eye-test',
    '/contact',
    '/about',
    '/return-policy',
    '/privacy-policy',
    '/terms',
    '/faq'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    await connectToDatabase();
    const products = await Product.find({}, { slug: 1, updatedAt: 1 }).lean();
    
    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return routes;
  }
}
