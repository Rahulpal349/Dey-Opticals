import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    await connectToDatabase();
    
    // Fetch full user data but exclude password
    const user = await User.findById(payload.userId).select('-passwordHash').lean();
    
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Convert _id to string for serialization
    const serializedUser = {
      ...user,
      _id: user._id.toString(),
      addresses: user.addresses?.map((addr: any) => ({
        ...addr,
        _id: addr._id?.toString()
      })) || []
    };

    return NextResponse.json({ authenticated: true, user: serializedUser });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
