import mongoose from 'mongoose';
import dotenv from 'dotenv'
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './dbConfigs/databaseConfig.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // this destroys all files in the db under these collections:
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // takes the data from users file and inserts the data: 
    const createdUsers = await User.insertMany(users);

    // from created users we are getting the admin user that creates the product:
    const adminUser = createdUsers[0]._id;

    // bringing in the  data from products file and adding the admin user data to the product to show who created it.
    const sampleProducts = products.map((product) => {
      return {
        ...product, user: adminUser
      }
    });

    // brings in the data saved in the sampleProducts 
    await Product.insertMany(sampleProducts);


    console.log('Data Imported'.rainbow);
    process.exit();

  } catch (error) {
    console.error(`${error}`.red)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Deleted!'.red.underline);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.underline);
    process.exit(1);
  }
}


if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

// npm run data:import ..... to import
// npm run data:destroy ..... to destroy
