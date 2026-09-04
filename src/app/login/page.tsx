"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '/profile';
  const { setUser } = useStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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

      // Fetch user profile immediately after login
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      if (meData.authenticated) {
        setUser(meData.user);
      }

      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm h-fit">
        <h1 className="text-3xl font-bold font-heading mb-2 text-center text-primary">Welcome Back</h1>
        <p className="text-gray-500 mb-8 text-center">Login to your Dey Opticals account</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email Address</label>
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none" 
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium flex justify-between">
              Password
              <span className="text-primary hover:underline cursor-pointer">Forgot?</span>
            </label>
            <input 
              required 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none" 
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full font-semibold mt-4" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 flex justify-center min-h-[70vh]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
