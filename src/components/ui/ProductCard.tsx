"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Card } from './Card';
import { Badge } from './Badge';
import { PriceTag } from './PriceTag';
import { Button } from './Button';

export interface ProductCardProps {
  id: string | number;
  image: string;
  brand: string;
  name: string;
  badge?: string;
  discountPercent?: number;
  price: number;
  mrp: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  brand,
  name,
  badge,
  discountPercent,
  price,
  mrp,
}) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWishlisted = mounted ? isInWishlist(id.toString()) : false;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id.toString());
    } else {
      addToWishlist({
        id: id.toString(),
        name,
        price,
        image,
        slug: id.toString(), // assuming slug is passed as id or need to pass slug
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: id.toString(),
      name,
      price,
      image,
      slug: id.toString(),
      quantity: 1
    });
  };

  return (
    <Card className="overflow-hidden group flex flex-col relative transition-all duration-300 hover:shadow-md">
      {/* Wishlist Button */}
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-colors"
        aria-label="Add to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-accent text-accent' : 'text-gray-500'}`} />
      </button>

      {/* Badges container (top left) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {badge && (
          <Badge variant={badge === 'NEW' ? 'success' : 'default'} className="shadow-sm">
            {badge}
          </Badge>
        )}
        {discountPercent && discountPercent > 0 && (
          <Badge variant="destructive" className="shadow-sm bg-red-600">
            {discountPercent}% OFF
          </Badge>
        )}
      </div>

      {/* Image Wrapper */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          {brand}
        </span>
        <h3 className="font-semibold text-text line-clamp-1 mb-2">
          {name}
        </h3>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <PriceTag price={price} mrp={mrp} />
        </div>
        
        <Button 
          className="w-full mt-4 font-semibold" 
          variant="primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};
