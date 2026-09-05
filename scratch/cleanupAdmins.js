require('dotenv').config({ path: './apps/admin/.env.local' });
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || "mongodb://rahulxgaming69_db_user:Krishna%400203@ac-d4cruoi-shard-00-00.7cpyruj.mongodb.net:27017,ac-d4cruoi-shard-00-01.7cpyruj.mongodb.net:27017,ac-d4cruoi-shard-00-02.7cpyruj.mongodb.net:27017/dey_opticals?ssl=true&replicaSet=atlas-udj1w2-shard-0&authSource=admin&appName=Cluster0";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function cleanupAdmins() {
  try {
    await mongoose.connect(URI, { family: 4 });
    
    // Delete the invalid email user
    await User.deleteOne({ email: 'papaipal44' });
    console.log('Cleaned up the invalid "papaipal44" account.');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

cleanupAdmins();
