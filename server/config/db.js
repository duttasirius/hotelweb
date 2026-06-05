import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DATABASE CONNECTED"),
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/hotel`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
