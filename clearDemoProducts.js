require('dotenv').config({ path: './apps/admin/.env.local' });
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

const bookingSchema = new mongoose.Schema({}, { strict: false });
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

const messageSchema = new mongoose.Schema({}, { strict: false });
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);


async function clearAll() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');

    const productResult = await Product.deleteMany({});
    console.log(`Deleted ${productResult.deletedCount} products`);

    const orderResult = await Order.deleteMany({});
    console.log(`Deleted ${orderResult.deletedCount} orders`);

    const bookingResult = await Booking.deleteMany({});
    console.log(`Deleted ${bookingResult.deletedCount} bookings`);
    
    const messageResult = await Message.deleteMany({});
    console.log(`Deleted ${messageResult.deletedCount} messages`);

    console.log('Database is clean and ready for testing!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

clearAll();
