import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from '../models/Board'
import PostSchema from '../models/Post'
class DbContext {
    Values = mongoose.model("Value", ValueSchema);
    Profile = mongoose.model("Profile", ProfileSchema);
    Boards = mongoose.model("Board", BoardSchema);
    Posts = mongoose.model('Post', PostSchema);



}

export const dbContext = new DbContext();