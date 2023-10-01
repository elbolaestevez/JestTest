import express, { json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDB } from "./config/db";
import { allRoutes } from "./routes";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(json());
app.use("/api", allRoutes);

(async () => {
  try {
    await connectToDB();
    console.log("Successfully connected to the database");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
