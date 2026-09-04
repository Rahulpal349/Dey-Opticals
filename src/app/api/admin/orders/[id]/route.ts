import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { orderStatus } = await request.json();
    
    if (!orderStatus) {
      return NextResponse.json({ error: 'orderStatus is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id, 
      { orderStatus }, 
      { new: true }
    );
    
    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
