"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'eyeglasses',
    frameShape: 'rectangle',
    price: '',
    mrp: '',
    stockCount: '',
    images: [''],
    description: '',
  });

  const fetchProducts = async (searchQuery = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${searchQuery}`);
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '', brand: '', category: 'eyeglasses', frameShape: 'rectangle',
      price: '', mrp: '', stockCount: '', images: [''], description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      brand: product.brand || '',
      category: product.category,
      frameShape: product.frameShape,
      price: product.price.toString(),
      mrp: product.mrp.toString(),
      stockCount: product.stockCount.toString(),
      images: product.images && product.images.length > 0 ? product.images : [''],
      description: product.description || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts(search);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert strings to numbers where necessary
    const payload = {
      ...formData,
      price: Number(formData.price),
      mrp: Number(formData.mrp),
      stockCount: Number(formData.stockCount),
      images: formData.images.filter(img => img.trim() !== '') // Remove empty image URLs
    };

    try {
      if (editingId) {
        await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchProducts(search);
      toast.success(editingId ? 'Product updated' : 'Product created');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-heading text-slate-800">Products</h1>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-gray-100 rounded border overflow-hidden shrink-0">
                          {product.images && product.images[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.category.replace('-', ' ')}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">₹{product.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 line-through">₹{product.mrp.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stockCount > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stockCount > 0 ? `${product.stockCount} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditModal(product)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl my-8">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-xl font-bold font-heading">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brand</label>
                  <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border rounded-lg px-3 py-2 capitalize">
                    {['eyeglasses', 'sunglasses', 'contact-lenses', 'kids-glasses', 'computer-glasses', 'reading-glasses', 'sports-glasses'].map(c => (
                      <option key={c} value={c}>{c.replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Frame Shape *</label>
                  <select value={formData.frameShape} onChange={(e) => setFormData({...formData, frameShape: e.target.value})} className="w-full border rounded-lg px-3 py-2 capitalize">
                    {['rectangle', 'cat-eye', 'aviator', 'geometric', 'round', 'clubmaster', 'square'].map(s => (
                      <option key={s} value={s}>{s.replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Selling Price (₹) *</label>
                  <input required type="number" min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">MRP (₹) *</label>
                  <input required type="number" min="0" value={formData.mrp} onChange={(e) => setFormData({...formData, mrp: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Count *</label>
                  <input required type="number" min="0" value={formData.stockCount} onChange={(e) => setFormData({...formData, stockCount: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL *</label>
                  <input required type="url" placeholder="https://..." value={formData.images[0]} onChange={(e) => setFormData({...formData, images: [e.target.value]})} className="w-full border rounded-lg px-3 py-2" />
                  <p className="text-xs text-gray-500">Provide a direct link to the image (e.g., Unsplash or CDN).</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg px-3 py-2 resize-none"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingId ? 'Save Changes' : 'Create Product'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
