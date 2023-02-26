import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    connectDB(`${process.env.MONGODB_URL}`);
    app.listen(port, () =>
      console.log(`Server has started on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
