const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

const connectDB = require('./config/db');
dotenv.config();

connectDB();

const importData = async () => {
    try {
        //Clear all existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id;
        //setting the user of all sample produts to the admin user
        const sampleProducts = products.map(product => {
            return { user:adminUser, ...products}
        });
        await Product.insertMany(sampleProducts);
        console.log('Data imported');
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }

};

const destroyData = async () => {
    try {
        //Clear all existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed');
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }

};

if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}