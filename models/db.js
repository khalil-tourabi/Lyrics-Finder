import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://elhoubiyoussef:faghjklq@cluster0.pgmp2gi.mongodb.net/", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
};

export default connectDB;