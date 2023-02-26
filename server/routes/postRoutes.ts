import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router
  .route("/")
  // GET all posts
  .get(async (req: Request, res: Response) => {
    try {
      const posts = await Post.find({});

      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  })
  // CREATE a post
  .post(async (req: Request, res: Response) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });

      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  });

export default router;
