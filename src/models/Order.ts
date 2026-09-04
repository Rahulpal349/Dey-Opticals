import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface IOrder extends Document {
  userId?: string;
  items: IOrderItem[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  subtotal: number;
  total: number;
  paymentId?: string;
  orderId: string; // Razorpay Order ID
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'captured' | 'failed' | 'refunded';
  webhookLog: any[];
  createdAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  slug: { type: String, required: true }
});

const OrderSchema: Schema = new Schema({
  userId: { type: String }, // Optional for guest checkout
  items: [OrderItemSchema],
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentId: { type: String, required: false }, // Can be false initially, set when webhook/verify hits
  orderId: { type: String, required: true }, // Razorpay Order ID
  orderStatus: { 
    type: String, 
    required: true,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending' // Should be pending until payment captured
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'captured', 'failed', 'refunded'],
    default: 'pending'
  },
  webhookLog: { type: [Schema.Types.Mixed], default: [] },
  createdAt: { type: Date, default: Date.now }
});

// Indexes for performance
OrderSchema.index({ userId: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ orderId: 1 }, { unique: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
