import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Booking from '@/models/Booking';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectToDatabase();
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
