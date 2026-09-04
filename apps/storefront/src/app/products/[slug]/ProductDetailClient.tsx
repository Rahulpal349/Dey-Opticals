"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { PriceTag } from '@/components/ui/PriceTag';
import { Badge } from '@/components/ui/Badge';
import { Heart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted && product ? isInWishlist(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.status === 404) {
          router.push('/404');
          return;
        }
        const data = await res.json();
        setProduct(data.product);
        setRelated(data.relatedProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="aspect-[4/3] bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="space-y-4">
            <div className="w-1/4 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-3/4 h-10 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-1/3 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-12 bg-gray-200 animate-pulse rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity: quantity
    });
    toast.success('Added to cart');
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
      });
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 capitalize">
        Home / {product.category.replace('-', ' ')} / {product.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video md:aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border">
            <Image 
              src={product.images[activeImage]} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
            {product.isNewArrival && (
              <Badge variant="success" className="absolute top-4 left-4 z-10">NEW</Badge>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <Image src={img} alt={`${product.name} thumbnail ${idx+1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{product.brand}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4 font-heading">{product.name}</h1>
          
          <div className="mb-6 flex items-center gap-4">
            <PriceTag price={product.price} mrp={product.mrp} className="text-2xl" />
            {product.discountPercent > 0 && (
              <Badge variant="destructive" className="bg-red-600">
                {product.discountPercent}% OFF
              </Badge>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">Frame Shape</span>
              <span className="font-semibold capitalize">{product.frameShape}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-500 block mb-1">Availability</span>
              <span className={`font-semibold ${product.stockCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border rounded-lg h-12">
              <button 
                className="px-4 text-xl text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >-</button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button 
                className="px-4 text-xl text-gray-500 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                aria-label="Increase quantity"
              >+</button>
            </div>
            
            <Button 
              size="lg" 
              className="flex-1 h-12 text-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            
            <button 
              onClick={toggleWishlist}
              className={`p-3 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${isWishlisted ? 'border-accent bg-accent/10 text-accent' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Section */}
          <div className="grid grid-cols-3 gap-4 border-t pt-8">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium">1 Year<br/>Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCcw className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium">14 Day<br/>Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium">Free<br/>Shipping</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 border-t">
          <h2 className="text-2xl font-bold font-heading mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(rel => (
              <div key={rel._id} onClick={() => router.push(`/products/${rel.slug}`)} className="cursor-pointer group">
                <ProductCard
                  id={rel._id}
                  brand={rel.brand}
                  name={rel.name}
                  price={rel.price}
                  mrp={rel.mrp}
                  image={rel.images[0]}
                  discountPercent={rel.discountPercent}
                  badge={rel.isNewArrival ? "NEW" : ""}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
