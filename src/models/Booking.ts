import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  phone: string;
  address: string;
  date: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { 
    type: String, 
    required: true,
    enum: ['Morning', 'Afternoon', 'Evening'] 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
