import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: string;
  category: 'eyeglasses' | 'sunglasses' | 'contact-lenses' | 'kids-glasses' | 'computer-glasses' | 'reading-glasses' | 'sports-glasses';
  frameShape: 'rectangle' | 'cat-eye' | 'aviator' | 'geometric' | 'round' | 'clubmaster' | 'square';
  price: number;
  mrp: number;
  discountPercent: number;
  stockCount: number;
  images: string[];
  description: string;
  features: string[];
  isNewArrival: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['eyeglasses', 'sunglasses', 'contact-lenses', 'kids-glasses', 'computer-glasses', 'reading-glasses', 'sports-glasses']
  },
  frameShape: { 
    type: String, 
    required: true,
    enum: ['rectangle', 'cat-eye', 'aviator', 'geometric', 'round', 'clubmaster', 'square']
  },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discountPercent: { type: Number, default: 0 },
  stockCount: { type: Number, required: true, default: 0 },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true },
  isNewArrival: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Removed problematic pre-save hook. Logic moved to API routes.

ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ category: 1 });
ProductSchema.index({ frameShape: 1 });

// Avoid OverwriteModelError in development
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
