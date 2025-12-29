const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // 1. Wipe existing data
    await User.deleteMany();
    console.log('Data Destroyed...');

    // 2. Create Users Array
    const users = [
      {
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        status: 'active',
      },
      {
        fullName: 'John Doe',
        email: 'user1@example.com',
        password: 'password123',
        role: 'user',
        status: 'active',
      },
      {
        fullName: 'Jane Smith',
        email: 'user2@example.com',
        password: 'password123',
        role: 'user',
        status: 'inactive', 
      },
    ];

    // 3. Insert Users 
    await User.create(users);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// Check command line argument to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}