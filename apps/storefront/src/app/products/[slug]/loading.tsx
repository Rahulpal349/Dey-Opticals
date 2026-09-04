import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="w-64 h-4 bg-gray-200 animate-pulse rounded mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="aspect-video md:aspect-[4/3] bg-gray-200 animate-pulse rounded-2xl"></div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-24 h-24 bg-gray-200 animate-pulse rounded-xl shrink-0"></div>
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="flex flex-col">
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="w-3/4 h-10 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="w-1/3 h-8 bg-gray-200 animate-pulse rounded mb-6"></div>
          
          <div className="space-y-2 mb-6">
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="h-16 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-16 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-32 h-12 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex-1 h-12 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
