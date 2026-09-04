"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, wishlist, user, setUser } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, [user, setUser]);

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  const navLinks = [
    { name: 'Eyeglasses', href: '/products?category=eyeglasses' },
    { name: 'Sunglasses', href: '/products?category=sunglasses' },
    { name: 'Contact Lenses', href: '/products?category=contact-lenses' },
    { name: 'Kids Glasses', href: '/products?category=kids-glasses' },
    { name: 'Offers', href: '/products?offer=true' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Dey Opticals Logo" width={32} height={32} className="rounded-full" />
            <span className="text-2xl font-bold font-heading text-primary">Dey Opticals</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-text hover:text-accent transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-text" />
          </button>
          
          <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative hidden sm:block">
            <Heart className="w-5 h-5 text-text" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-text" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <Link href="/profile" className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors">
              {user.name.charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
              <User className="w-5 h-5 text-text" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-text" /> : <Menu className="w-5 h-5 text-text" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col py-4 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-base font-medium text-text hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t">
              <button className="flex items-center gap-2 text-sm font-medium text-text">
                <Heart className="w-5 h-5" /> Wishlist
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-text">
                <User className="w-5 h-5" /> Profile
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
