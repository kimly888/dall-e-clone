import mongoose from "mongoose";

const connectDB = (url: string) => {
  // Useful option when working with search functionality
  mongoose.set("strictQuery", true);

  // Connect Mongo database
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export default connectDB;
