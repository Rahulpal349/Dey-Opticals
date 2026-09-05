require('dotenv').config({ path: './apps/admin/.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const URI = "mongodb+srv://rahulxgaming69_db_user:Krishna%400203@cluster0.7cpyruj.mongodb.net/dey_opticals?retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'customer' },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    await mongoose.connect(URI, { family: 4 });
    console.log('Connected to DB');

    const email = await question('Enter admin email: ');
    
    // Quick workaround to hide password input natively in node
    const password = await new Promise((resolve) => {
      process.stdout.write('Enter admin password: ');
      rl.stdoutMuted = true;
      rl.question('', (answer) => {
        rl.stdoutMuted = false;
        console.log('');
        resolve(answer);
      });
      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
          rl.output.write("*");
        else
          rl.output.write(stringToWrite);
      };
    });

    if (!email || !password) {
      console.error('Email and password are required!');
      process.exit(1);
    }

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists! You can log in with your credentials.');
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
    console.log('\nAdmin created successfully!');
    console.log(`Email: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
