"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUser } = useStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Check role immediately to avoid flickering
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      if (meData.authenticated && meData.user.role === 'admin') {
        setUser(meData.user);
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        // Log them out if they are not admin
        await fetch('/api/auth/logout', { method: 'POST' });
        throw new Error('Access denied. Administrator privileges required.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white text-2xl font-bold rounded-xl mb-4 shadow-lg">
            D
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Admin Portal</h1>
          <p className="text-slate-500 mt-2">Sign in to manage Dey Opticals</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 border border-red-100 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Admin Email</label>
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-0 outline-none transition-colors" 
              placeholder="admin@deyopticals.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input 
              required 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border-2 border-slate-200 rounded-lg px-4 py-2.5 focus:border-primary focus:ring-0 outline-none transition-colors" 
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-bold shadow-md" disabled={loading}>
            {loading ? 'Authenticating...' : 'Access Portal'}
          </Button>
        </form>
      </div>
    </div>
  );
}
