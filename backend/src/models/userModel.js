// const mongoose = require("mongoose");
// // How to create a model
// // Step 1 :require mongoose
// // Step 2 :Create a mongoose schema (structure of a user)
// // Step 3 : Create a model

// const User = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         private: true,
//     },
//     lastName: {
//         type: String,
//         required: false,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     username: {
//         type: String,
//         required: true,
//     },
//     likedSongs: {
//         // We will change this to array later
//         type: String,
//         default: "",
//     },
//     likedPlaylists: {
//         // We will change this to array later
//         type: String,
//         default: "",
//     },
//     subscribedArtists: {
//         // We will change this to array later
//         type: String,
//         default: "",
//     },
// });

// const UserModel = mongoose.model("User", User);

// module.exports = UserModel;
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        email: { type: String, required: true, unique: true }, // Unique email
        password: { type: String, required: true, select: false }, // Hide password in queries

        likedSongs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"song"
                
            },
        ],

        likedPlaylists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Playlist",
            },
        ],

        subscribedArtists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            },
        ],
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

const User = mongoose.model("User", UserSchema);
export default User;




