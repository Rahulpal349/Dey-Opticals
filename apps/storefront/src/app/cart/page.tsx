"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 2000 ? 99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold font-heading mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our premium collections and find your perfect pair.
        </p>
        <Link href="/products">
          <Button size="lg" className="font-semibold">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 min-h-[70vh]">
      <h1 className="text-3xl font-bold font-heading mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y">
            {cart.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                <Link href={`/products/${item.slug}`} className="shrink-0">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">{item.name}</h3>
                    </Link>
                    <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border rounded-lg h-10">
                      <button 
                        className="px-3 text-gray-500 hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      ><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        className="px-3 text-gray-500 hover:text-primary transition-colors"
                        onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                      ><Plus className="w-4 h-4" /></button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-xl p-6 border sticky top-24">
            <h2 className="text-xl font-bold font-heading mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-text">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-text">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-primary/80 bg-primary/10 p-2 rounded">
                  Add items worth ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                </div>
              )}
              <div className="border-t pt-4 flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button size="lg" className="w-full font-semibold">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
