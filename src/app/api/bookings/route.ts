import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { bookingSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!rateLimit(`booking_${ip}`, 3, 60 * 1000)) { // 3 bookings per minute
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }

    const data = await request.json();
    const result = bookingSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    await connectToDatabase();
    
    const booking = new Booking(result.data);
    await booking.save();
    
    return NextResponse.json({ success: true, bookingId: booking._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
