"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calculate an estimated delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const deliveryStr = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl min-h-[70vh]">
      <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-primary">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for shopping with Dey Opticals.
        </p>
        <p className="text-sm text-gray-500 mb-10">
          Your order ID is <span className="font-mono font-semibold text-text">{orderId}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
            <Package className="w-6 h-6 text-accent mb-2" />
            <span className="text-sm font-semibold mb-1">Processing</span>
            <span className="text-xs text-gray-500">We're packing it up</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-xl opacity-50 grayscale">
            <Truck className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm font-semibold mb-1">Shipped</span>
            <span className="text-xs text-gray-500">On the way</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-xl opacity-50 grayscale">
            <Home className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-sm font-semibold mb-1">Delivered</span>
            <span className="text-xs text-gray-500">Est. {deliveryStr}</span>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl p-4 mb-10 text-left text-sm max-w-lg mx-auto">
          <p className="font-semibold text-gray-900 mb-1">Tax Invoice (GST)</p>
          <p className="text-gray-600 mb-3">
            A GST-compliant tax invoice will be sent to your registered email address shortly. Dey Opticals is a GST-registered business.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Download Invoice Copy
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto font-semibold">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
