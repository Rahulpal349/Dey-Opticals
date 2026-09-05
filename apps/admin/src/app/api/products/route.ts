import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

// Fetch all products (admin view)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
    await connectToDatabase();
    
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: 'i' } };
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Create a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.price || !data.mrp || !data.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Auto-generate slug from name if not provided
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (!data.features) {
      data.features = [];
    }

    if (data.mrp && data.price && data.mrp > data.price) {
      data.discountPercent = Math.round(((data.mrp - data.price) / data.mrp) * 100);
    } else {
      data.discountPercent = 0;
    }

    await connectToDatabase();
    
    const newProduct = new Product(data);
    await newProduct.save();
    
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
