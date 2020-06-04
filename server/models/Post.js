import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Post = new Schema({
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    content: { type: String, required: true },
    picture: { type: String },
    support: [{ type: String, required: false }],
    disregard: [{ type: String, required: false }],

}, { timestamps: true, toJSON: { virtuals: true } })


Post.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
})

//CASCADE ON DELETE
// Post.pre('deleteMany', function(next) {
//     //lets find all the lists and remove them
//     Promise.all([
//             //something like...
//             //dbContext.Task.deleteMany({ listId: this._conditions_id }),
//         ])
//         .then(() => next())
//         .catch(err => next(err))
// })

// //CASCADE ON DELETE
// Post.pre('findOneAndRemove', function(next) {
//     //lets find all the lists and remove them
//     Promise.all([
//             // dbContext.Task.deleteMany({ boardId: this._conditions._id })
//         ])
//         .then(() => next())
//         .catch(err => next(err))
// })

export default Post