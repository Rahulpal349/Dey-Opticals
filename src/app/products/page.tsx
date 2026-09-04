"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ui/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filter States
  const [categories, setCategories] = useState<string[]>(
    searchParams.get('category')?.split(',') || []
  );
  const [shapes, setShapes] = useState<string[]>(
    searchParams.get('shape')?.split(',') || []
  );
  const [onOffer, setOnOffer] = useState(searchParams.get('offer') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  const CATEGORIES = [
    { id: 'eyeglasses', label: 'Eyeglasses' },
    { id: 'sunglasses', label: 'Sunglasses' },
    { id: 'contact-lenses', label: 'Contact Lenses' },
    { id: 'kids-glasses', label: 'Kids Glasses' },
    { id: 'computer-glasses', label: 'Computer Glasses' },
    { id: 'reading-glasses', label: 'Reading Glasses' },
    { id: 'sports-glasses', label: 'Sports Glasses' },
  ];

  const SHAPES = ['rectangle', 'cat-eye', 'aviator', 'geometric', 'round', 'clubmaster', 'square'];

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Reset page to 1 when filters change
    setPage(1);
  }, [categories, shapes, onOffer, sort]);

  useEffect(() => {
    fetchProducts(page === 1); // pass true if resetting
    const params = new URLSearchParams();
    if (categories.length) params.set('category', categories.join(','));
    if (shapes.length) params.set('shape', shapes.join(','));
    if (onOffer) params.set('offer', 'true');
    if (sort !== 'newest') params.set('sort', sort);
    
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [categories, shapes, onOffer, sort, page]);

  const fetchProducts = async (isReset = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categories.length) params.set('category', categories.join(','));
      if (shapes.length) params.set('shape', shapes.join(','));
      if (onOffer) params.set('offer', 'true');
      if (sort) params.set('sort', sort);
      params.set('page', page.toString());
      
      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      
      if (isReset) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat: string) => {
    setCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleShapeChange = (shape: string) => {
    setShapes(prev => 
      prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape]
    );
  };

  const FilterSidebar = () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-semibold mb-4 text-lg">Categories</h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={categories.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-lg">Frame Shape</h3>
        <div className="flex flex-col gap-2">
          {SHAPES.map(shape => (
            <label key={shape} className="flex items-center gap-2 cursor-pointer capitalize">
              <input 
                type="checkbox" 
                checked={shapes.includes(shape)}
                onChange={() => handleShapeChange(shape)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-gray-700">{shape.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={onOffer}
            onChange={() => setOnOffer(!onOffer)}
            className="w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent"
          />
          <span className="font-semibold text-lg">On Offer Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 min-h-screen">
        <div className="flex-1 flex items-center justify-between">
          <h1 className="text-3xl font-bold font-heading text-primary">Our Collection</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden md:block">
              {total} Results
            </span>
            <select 
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <FilterSidebar />
        </aside>

        {/* Mobile Drawer Overlay */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative w-4/5 max-w-sm bg-white h-full shadow-xl flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <FilterSidebar />
              </div>
              <div className="p-4 border-t">
                <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product._id} onClick={() => router.push(`/products/${product.slug}`)} className="cursor-pointer group">
                    <ProductCard
                      id={product._id}
                      brand={product.brand}
                      name={product.name}
                      price={product.price}
                      mrp={product.mrp}
                      image={product.images[0]}
                      discountPercent={product.discountPercent}
                      badge={product.isNewArrival ? "NEW" : (product.stockCount < 10 && product.stockCount > 0 ? "Few Left" : "")}
                    />
                  </div>
                ))}
              </div>
              
              {page < totalPages && (
                <div className="mt-12 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => p + 1)}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}
            </>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button 
                onClick={() => {
                  setCategories([]);
                  setShapes([]);
                  setOnOffer(false);
                  setPage(1);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading catalog...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
