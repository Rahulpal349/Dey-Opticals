import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

// Minimal Product Schema for seeding
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  frameShape: { type: String, required: true },
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

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const seedProducts = [
  {
    name: "Classic Aviator Gold",
    slug: "classic-aviator-gold",
    brand: "Ray-Ban",
    category: "sunglasses",
    frameShape: "aviator",
    price: 8500,
    mrp: 10500,
    stockCount: 15,
    images: [
      "https://placehold.co/800x600?text=Aviator+Gold+Front",
      "https://placehold.co/800x600?text=Aviator+Gold+Side",
      "https://placehold.co/800x600?text=Aviator+Gold+Model"
    ],
    description: "The timeless Ray-Ban Aviator Classic sunglasses originally designed for U.S. aviators in 1937. Currently one of the most iconic sunglass models in the world.",
    features: ["100% UV Protection", "Metal Frame", "Adjustable nose pads", "Includes premium case"],
    isNewArrival: true,
  },
  {
    name: "Retro Wayfarer Classic",
    slug: "retro-wayfarer-classic",
    brand: "Ray-Ban",
    category: "sunglasses",
    frameShape: "square",
    price: 6500,
    mrp: 8000,
    stockCount: 22,
    images: [
      "https://placehold.co/800x600?text=Wayfarer+Black",
      "https://placehold.co/800x600?text=Wayfarer+Black+Side"
    ],
    description: "The Original Wayfarer Classic is the most recognizable style in the history of sunglasses.",
    features: ["Polarized Lenses", "Acetate Frame", "Durable build"],
    isNewArrival: false,
  },
  {
    name: "Titanium Rimless Elegance",
    slug: "titanium-rimless-elegance",
    brand: "Dey Premium",
    category: "eyeglasses",
    frameShape: "rectangle",
    price: 3499,
    mrp: 5000,
    stockCount: 8,
    images: [
      "https://placehold.co/800x600?text=Titanium+Rimless+1",
      "https://placehold.co/800x600?text=Titanium+Rimless+2"
    ],
    description: "Ultra-lightweight rimless glasses made from aerospace-grade titanium. Perfect for professionals looking for a minimalist aesthetic.",
    features: ["Lightweight Titanium", "Hypoallergenic", "Flexible temples", "Anti-reflective coating compatible"],
    isNewArrival: true,
  },
  {
    name: "Blue Block Pro Mac",
    slug: "blue-block-pro-mac",
    brand: "Dey Basics",
    category: "computer-glasses",
    frameShape: "round",
    price: 1499,
    mrp: 2999,
    stockCount: 50,
    images: [
      "https://placehold.co/800x600?text=Blue+Block+Round",
      "https://placehold.co/800x600?text=Blue+Block+Model"
    ],
    description: "Protect your eyes from digital strain with our premium Blue Block lenses. Features a stylish round frame.",
    features: ["Blue Light Filtering", "TR90 Flexible Frame", "Reduces eye strain", "Zero power lenses"],
    isNewArrival: false,
  },
  {
    name: "Cat Eye Diva",
    slug: "cat-eye-diva",
    brand: "Vogue",
    category: "eyeglasses",
    frameShape: "cat-eye",
    price: 4290,
    mrp: 4290,
    stockCount: 12,
    images: [
      "https://placehold.co/800x600?text=Cat+Eye+Tortoiseshell",
      "https://placehold.co/800x600?text=Cat+Eye+Side"
    ],
    description: "Make a statement with these bold cat-eye frames. Features a beautiful tortoiseshell pattern that adds warmth to any face shape.",
    features: ["Premium Acetate", "Spring Hinges", "Fashion-forward design"],
    isNewArrival: true,
  },
  {
    name: "Clubmaster Classic",
    slug: "clubmaster-classic",
    brand: "Ray-Ban",
    category: "eyeglasses",
    frameShape: "clubmaster",
    price: 7200,
    mrp: 9000,
    stockCount: 18,
    images: [
      "https://placehold.co/800x600?text=Clubmaster+Front",
      "https://placehold.co/800x600?text=Clubmaster+Detail"
    ],
    description: "Retro and timeless. Inspired by the 50s, the unmistakable design of the Clubmaster Classic is worn by cultural intellectuals.",
    features: ["Half-rim design", "Adjustable nose pads", "Classic styling"],
    isNewArrival: false,
  },
  {
    name: "Geometric Gold Wire",
    slug: "geometric-gold-wire",
    brand: "Dey Premium",
    category: "eyeglasses",
    frameShape: "geometric",
    price: 2499,
    mrp: 3500,
    stockCount: 30,
    images: [
      "https://placehold.co/800x600?text=Geometric+Gold",
      "https://placehold.co/800x600?text=Geometric+Angle"
    ],
    description: "Stand out from the crowd with these delicate but striking geometric wire frames in a soft gold finish.",
    features: ["Stainless Steel", "Unique angular shape", "Very lightweight"],
    isNewArrival: true,
  },
  {
    name: "Holbrook Sport Performance",
    slug: "holbrook-sport-performance",
    brand: "Oakley",
    category: "sports-glasses",
    frameShape: "square",
    price: 9500,
    mrp: 12000,
    stockCount: 5,
    images: [
      "https://placehold.co/800x600?text=Oakley+Holbrook",
      "https://placehold.co/800x600?text=Oakley+Side"
    ],
    description: "Holbrook is a timeless, classic design fused with modern Oakley technology. Perfect for high performance and everyday wear.",
    features: ["Prizm™ Lenses", "O Matter™ frame material", "High Definition Optics"],
    isNewArrival: false,
  },
  {
    name: "Kids Flexi Safe",
    slug: "kids-flexi-safe",
    brand: "Dey Kids",
    category: "kids-glasses",
    frameShape: "rectangle",
    price: 999,
    mrp: 1500,
    stockCount: 45,
    images: [
      "https://placehold.co/800x600?text=Kids+Flexi+Blue",
      "https://placehold.co/800x600?text=Kids+Flexi+Bend"
    ],
    description: "Unbreakable and ultra-flexible frames designed specifically for active kids. Safe, non-toxic materials.",
    features: ["180 degree flexible hinge", "Non-toxic silicone", "Includes strap"],
    isNewArrival: false,
  },
  {
    name: "Daily Disposables (30 Pack)",
    slug: "daily-disposables-30",
    brand: "Acuvue",
    category: "contact-lenses",
    frameShape: "round", // Fallback for schema
    price: 1800,
    mrp: 2200,
    stockCount: 100,
    images: [
      "https://placehold.co/800x600?text=Contact+Lenses+Box",
      "https://placehold.co/800x600?text=Contact+Lenses+Blister"
    ],
    description: "Experience fresh, comfortable vision every day with Acuvue Moist daily disposable contact lenses.",
    features: ["LACREON Technology", "UV Blocking", "30 lenses per box"],
    isNewArrival: false,
  },
  {
    name: "Reading Pro +2.00",
    slug: "reading-pro-200",
    brand: "Dey Basics",
    category: "reading-glasses",
    frameShape: "rectangle",
    price: 799,
    mrp: 1200,
    stockCount: 60,
    images: [
      "https://placehold.co/800x600?text=Reading+Glasses",
    ],
    description: "Compact, durable reading glasses with premium scratch-resistant lenses.",
    features: ["+2.00 Power", "Scratch-resistant", "Compact carrying case"],
    isNewArrival: false,
  },
  {
    name: "Aviator Optical",
    slug: "aviator-optical",
    brand: "Ray-Ban",
    category: "eyeglasses",
    frameShape: "aviator",
    price: 6500,
    mrp: 7500,
    stockCount: 12,
    images: [
      "https://placehold.co/800x600?text=Aviator+Optical",
    ],
    description: "The iconic Aviator shape, now available as optical frames. Command attention in the boardroom.",
    features: ["Metal frame", "Large fit", "Adjustable nose pads"],
    isNewArrival: true,
  },
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected!');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('Inserting seed data...');
    // Auto calculate discount percentage
    const processedProducts = seedProducts.map(p => {
      let discountPercent = 0;
      if (p.mrp > p.price) {
        discountPercent = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      }
      return { ...p, discountPercent };
    });

    await Product.insertMany(processedProducts);
    
    console.log(`Successfully seeded ${processedProducts.length} products!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();
