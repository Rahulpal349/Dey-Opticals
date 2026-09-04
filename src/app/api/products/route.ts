import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const shape = searchParams.get('shape');
    const offer = searchParams.get('offer');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    // Build query
    const query: any = {};
    
    if (category) {
      // Allow multiple categories comma separated
      const categories = category.split(',');
      query.category = { $in: categories };
    }
    
    if (shape) {
      const shapes = shape.split(',');
      query.frameShape = { $in: shapes };
    }
    
    if (offer === 'true') {
      query.discountPercent = { $gt: 0 };
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Build sort
    let sortObj: any = {};
    if (sort === 'price_asc') {
      sortObj.price = 1;
    } else if (sort === 'price_desc') {
      sortObj.price = -1;
    } else if (sort === 'newest') {
      sortObj.createdAt = -1;
    } else {
      sortObj.createdAt = -1; // Default
    }

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
