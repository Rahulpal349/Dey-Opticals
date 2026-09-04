require('dotenv').config({ path: './apps/admin/.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const URI = "mongodb://rahulxgaming69_db_user:Krishna%400203@ac-d4cruoi-shard-00-00.7cpyruj.mongodb.net:27017,ac-d4cruoi-shard-00-01.7cpyruj.mongodb.net:27017,ac-d4cruoi-shard-00-02.7cpyruj.mongodb.net:27017/dey_opticals?ssl=true&replicaSet=atlas-d4cruoi-shard-0&authSource=admin&retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'customer' },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(URI, { family: 4 });
    console.log('Connected to DB');

    const email = 'admin@deyopticals.com';
    const password = 'password123';
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists! You can log in with:');
      console.log('Email:', email);
      console.log('Password: password123');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = new User({
      name: 'Super Admin',
      email,
      passwordHash,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin created successfully! Credentials:');
    console.log('Email: admin@deyopticals.com');
    console.log('Password: password123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
