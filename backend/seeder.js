const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const products = require('./data/products');
const adminUser = require('./data/adminUser');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

// Load env vars from absolute path
dotenv.config({ path: path.join(__dirname, '.env') });

const importData = async () => {
  try {
    await connectDB();

    // Cleanup existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Import Product data
    await Product.insertMany(products);

    // Import Admin User
    await User.create(adminUser);

    console.log('Data (Products + Admin) Imported Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
