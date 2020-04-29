import mongoose from "mongoose";
import { dbContext } from "../db/DbContext";
const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    username: { type: String, required: true },
    picture: { type: String },
    // TODO user role setup, learn w/ team 
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Profile;
