import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import PostSchema from '../models/Post'
class DbContext {
    Values = mongoose.model("Value", ValueSchema);
    Profile = mongoose.model("Profile", ProfileSchema);
    Posts = mongoose.model('Post', PostSchema);



}

export const dbContext = new DbContext();