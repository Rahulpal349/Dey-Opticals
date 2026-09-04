import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-800 mb-4">
        Page Not Found
      </h1>
      
      <p className="text-gray-500 mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
