import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect";
import postRoutes from "./routes/postRoutes";
import dalleRoutes from "./routes/dalleRoutes";

// To ensure that environment variables are populated
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// API routes that the frontend can hook onto
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    // Use a template string and interpolate the environment variable when using TypeScript
    connectDB(`${process.env.MONGODB_URL}`);
    app.listen(port, () =>
      console.log(`Server has started on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
