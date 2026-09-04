import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug: params.slug }).lean();

    if (!product) {
      return {
        title: 'Product Not Found | Dey Opticals',
      };
    }

    return {
      title: `${product.name} | Dey Opticals`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: `${product.name} | Dey Opticals`,
        description: product.description.slice(0, 160),
        images: [
          {
            url: product.images[0] || '/og-image.jpg',
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Dey Opticals',
    };
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
