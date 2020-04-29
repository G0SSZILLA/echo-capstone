import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  postId: { type: ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  creatorId: { type: ObjectId, ref: "User", required: true },
  likes: [{ type: ObjectId, ref: "User" }],
  support: { type: Boolean, required: true },

}, { timestamps: true, toJSON: { virtuals: true } })

Comment.virtual("creator",
  {
    localField: "creatorId",
    ref: "Profile",
    foreignField: "id",
    justOne: true
  })

//CASCADE ON DELETE
// Board.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     dbContext.List.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Comment