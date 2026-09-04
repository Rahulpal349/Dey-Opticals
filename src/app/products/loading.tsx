import React from 'react';

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Mobile filter button skeleton */}
      <div className="md:hidden mb-4">
        <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-64 flex-shrink-0 hidden md:block space-y-8">
          <div>
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Skeleton */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-40 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 border flex flex-col h-full">
                <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse rounded-xl mb-4"></div>
                <div className="w-1/3 h-3 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="w-24 h-6 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
