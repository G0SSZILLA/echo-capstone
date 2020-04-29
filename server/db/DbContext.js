import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import PostSchema from '../models/Post'
import CommentSchema from '../models/Comment'
class DbContext {
    Values = mongoose.model("Value", ValueSchema);
    Profile = mongoose.model("Profile", ProfileSchema);
    Posts = mongoose.model('Post', PostSchema);
    Comments = mongoose.model('Comment', CommentSchema)



}

export const dbContext = new DbContext();