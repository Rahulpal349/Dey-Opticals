import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/models/Message';
import { contactSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!rateLimit(`message_${ip}`, 3, 60 * 1000)) { // 3 messages per minute
      return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
    }

    const data = await request.json();
    const result = contactSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    await connectToDatabase();
    
    const newMessage = new Message(result.data);
    await newMessage.save();
    
    return NextResponse.json({ success: true, messageId: newMessage._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
