import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

// User Schema for seeding admin
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected!');

    const adminEmail = 'admin@deyopticals.com';
    const adminPassword = 'adminpassword123';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
       console.log('Admin user already exists. Email: ' + adminEmail + ' / Password: ' + adminPassword);
       process.exit(0);
    }
    
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      phone: '9999999999',
      passwordHash,
      role: 'admin'
    });
    
    console.log('Admin user created successfully!');
    console.log('Email: ' + adminEmail);
    console.log('Password: ' + adminPassword);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
