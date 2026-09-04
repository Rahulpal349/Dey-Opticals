import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // product id
  name: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  slug: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User | null;
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      setUser: (user) => set({ user }),
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
          return {
            cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
          };
        }
        return { cart: [...state.cart, item] };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(i => i.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(i => i.id === id ? { ...i, quantity } : i)
      })),
      clearCart: () => set({ cart: [] }),
      
      addToWishlist: (item) => set((state) => {
        if (state.wishlist.find(i => i.id === item.id)) return state;
        return { wishlist: [...state.wishlist, item] };
      }),
      removeFromWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.filter(i => i.id !== id)
      })),
      isInWishlist: (id) => {
        return get().wishlist.some(i => i.id === id);
      }
    }),
    {
      name: 'dey-opticals-storage',
    }
  )
);
