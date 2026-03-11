const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Mongodb connected");

  } catch (error) {
    console.error("Db connection failed", error);
  }

};
module.exports = connectDB;
