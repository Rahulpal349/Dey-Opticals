import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    const startTime = Date.now();
    await connectToDatabase();
    
    // Check if the connection is ready (1 = connected)
    const isConnected = mongoose.connection.readyState === 1;
    
    if (!isConnected) {
      return NextResponse.json({ status: 'unhealthy', error: 'Database not connected' }, { status: 503 });
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({ 
      status: 'healthy', 
      database: 'connected',
      responseTime: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ status: 'unhealthy', error: 'Service Unavailable' }, { status: 503 });
  }
}
