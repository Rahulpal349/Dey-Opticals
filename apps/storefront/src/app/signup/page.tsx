"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Automatically redirect to login page
      router.push('/login?redirect=/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm h-fit">
        <h1 className="text-3xl font-bold font-heading mb-2 text-center text-primary">Create Account</h1>
        <p className="text-gray-500 mb-8 text-center">Join Dey Opticals today</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Full Name</label>
            <input 
              required 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none" 
              placeholder="Rahul Dey"
            />
          </div>
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
            <label className="text-sm font-medium">Password</label>
            <input 
              required 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none" 
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Confirm Password</label>
            <input 
              required 
              type="password" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none" 
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full font-semibold mt-4" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
