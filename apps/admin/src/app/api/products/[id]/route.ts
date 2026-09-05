import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

// Update a product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    await connectToDatabase();
    if (data.mrp && data.price && data.mrp > data.price) {
      data.discountPercent = Math.round(((data.mrp - data.price) / data.mrp) * 100);
    } else if (data.mrp && data.price) {
      data.discountPercent = 0;
    }

    const updatedProduct = await Product.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// Delete a product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
