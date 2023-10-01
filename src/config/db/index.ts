import mongoose from "mongoose";
require("dotenv").config();

const uri = process.env.MONGO_URI || "";

const connectToDB = async () => {
  try {
    return await mongoose.connect(uri);
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};
const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.error("Failed to disconnect from database", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from database");
});

export { connectToDB, disconnectFromDB };
