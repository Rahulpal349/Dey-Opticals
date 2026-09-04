import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    await connectToDatabase();

    // Idempotency: We search by the razorpay order_id included in the event
    const razorpayOrderId = event.payload?.payment?.entity?.order_id;
    if (!razorpayOrderId) {
      return NextResponse.json({ error: 'No order_id in event' }, { status: 400 });
    }

    const order = await Order.findOne({ orderId: razorpayOrderId });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Append to webhook log
    order.webhookLog.push({
      event: event.event,
      timestamp: new Date(),
      data: event.payload
    });

    // Handle events
    switch (event.event) {
      case 'payment.captured':
        if (order.paymentStatus !== 'captured') {
          order.paymentStatus = 'captured';
          order.orderStatus = 'confirmed';
          order.paymentId = event.payload.payment.entity.id;
        }
        break;
      case 'payment.failed':
        if (order.paymentStatus !== 'captured') {
          order.paymentStatus = 'failed';
          // we don't cancel order yet, user might retry
        }
        break;
      case 'refund.processed':
        order.paymentStatus = 'refunded';
        order.orderStatus = 'cancelled';
        break;
    }

    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
