import express from 'express'
import { addPlaylist } from '../controllers/playlistController.js';
import upload from '../middleware/multer.js'
import passport from 'passport';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import fs from 'fs';
import path from 'path';
import playlistModel from '../models/playlistModel.js';
import songModel from '../models/songModel.js';
import User from '../models/userModel.js';

const uploadStream = (filePath) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      
      // Read file buffer and pipe to Cloudinary stream
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(stream);
    });
  };

const playlistRouter = express.Router();


playlistRouter.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    upload.single('image'),
    async (req, res) => {
      try {
        console.log("User:", req.user);
        console.log("Body:", req.body);
        console.log("File:", req.file);

        if (!req.file) {
          return res.status(400).json({ error: "No image uploaded" });
        }

        const { name, desc, songs } = req.body;
        if (!name ) {
          return res.status(400).json({ error: "Playlist name is required" });
        }

        const imageUpload = await uploadStream(req.file.path);

        const playlistData = {
          name,
          desc,
          image: imageUpload.secure_url,
          owner: req.user._id,
          songs: JSON.parse(songs || "[]"),
        };

        const playlist = await playlistModel.create(playlistData);
        return res.status(200).json({ success: true, playlist });
      } catch (error) {
        console.error("Error creating playlist:", error);
        return res.status(500).json({ error: error.message });
      }
    }
);


playlistRouter.get(
    "/myplaylists",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        const userId = req.user._id;

        const playlists = await playlistModel.find({owner: userId}).populate(
            "owner"
        );
        return res.status(200).json({data: playlists});
    }
);



playlistRouter.get(
    "/mysongs/:id",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        // This concept is called req.params
        
        const playlistId = req.params.id;
        console.log(playlistId)
        // I need to find a playlist with the _id = playlistId
        const playlist = await playlistModel.findOne({_id: playlistId}).populate({
                path:"songs",
                model:songModel
        });
        if (!playlist) {
            return res.status(301).json({err: "Invalid ID"});
        }
        return res.status(200).json(playlist);
    }
);
export default playlistRouter;