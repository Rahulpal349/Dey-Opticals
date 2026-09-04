"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold font-heading mb-4">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Save items you love and buy them later when you're ready.
        </p>
        <Link href="/products">
          <Button size="lg" className="font-semibold">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 min-h-[70vh]">
      <h1 className="text-3xl font-bold font-heading mb-8">My Wishlist ({wishlist.length})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white border rounded-xl overflow-hidden group flex flex-col">
            <div className="relative aspect-[4/3] bg-gray-50">
              <Link href={`/products/${item.slug}`}>
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </Link>
              <button 
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-red-500 hover:bg-red-50 transition-colors z-10"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <Link href={`/products/${item.slug}`}>
                <h3 className="font-semibold text-text line-clamp-1 mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
              </Link>
              <span className="font-semibold text-lg mb-4">₹{item.price.toLocaleString()}</span>
              
              <Button 
                variant="outline" 
                className="w-full mt-auto flex items-center gap-2"
                onClick={() => {
                  addToCart({ ...item, quantity: 1 });
                  removeFromWishlist(item.id);
                }}
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
