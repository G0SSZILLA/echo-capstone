import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class CommentsService {
  async getAll() {
    return await dbContext.Comments.find().populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Comments.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Comments.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Comments.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    return data;
  }

  async delete(id) {
    let data = await dbContext.Comments.findOneAndRemove({ _id: id});
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
  }

  async getCommentsByPostId(postId) {
    let data = await dbContext.Comments.find({ postId: postId}).populate("creator", "name picture")
    return data
  }
  async getCommentsByUserEmail(userEmail) {
    let data = await dbContext.Comments.find({ creatorEmail: userEmail })
    return data
  }
}


export const commentsService = new CommentsService()