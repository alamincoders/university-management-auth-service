import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongo_uri as string);
    console.log("Mongodb Connected!");

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error: any) {
    console.log("Failed to connect database", error.message);
  }
};

dbConnect();
