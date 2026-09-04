import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Booking from '@/models/Booking';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectToDatabase();
    
    // Aggregations for summary cards
    const totalOrders = await Order.countDocuments();
    
    const revenueResult = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    
    const totalProducts = await Product.countDocuments();
    const pendingOrdersCount = await Order.countDocuments({ orderStatus: 'pending' });

    // Chart.js data: Orders over the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Fill missing days with 0 so the chart looks continuous
    const chartLabels = [];
    const chartData = [];
    
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      chartLabels.push(d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
      
      const found = recentOrders.find(o => o._id === dateStr);
      chartData.push(found ? found.count : 0);
    }

    return NextResponse.json({
      summary: {
        totalOrders,
        totalRevenue,
        totalProducts,
        pendingOrdersCount
      },
      chart: {
        labels: chartLabels,
        data: chartData
      }
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
