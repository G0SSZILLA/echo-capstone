import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PostsService {
  async getAll(date) {
    // return await dbContext.Posts.find({}).skip(+skip).limit(10).populate("creator", "name picture")
    return await dbContext.Posts.find({
      createdAt: { $lte: date},
    }).limit(10)
    // .aggregate([{
    //     $sort: {createdAt: -1}}],
    // {limit: 5}
    // )
  }

  async getById(id) {
    let data = await dbContext.Posts.findOne({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Post");
    }
    return data;
  }
  async getPostsByUserEmail(userEmail) {
    let data = await dbContext.Posts.find({ creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Post");
    }
    return data;
  }
  async create(rawData) {
    let data = await dbContext.Posts.create(rawData);
    return data;
  }

  async edit(id, update) {
    let data = await dbContext.Posts.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Post");
    }
    return data;
  }
  async vote(id, supportChoice, email) {
    let updateChoice = { $addToSet: {} };
    updateChoice.$addToSet[supportChoice] = email;
    let data = await dbContext.Posts.findOneAndUpdate(
      { _id: id },
      updateChoice,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Post");
    }
    return data;
  }

  async delete(id) {
    let data = await dbContext.Posts.findOneAndRemove({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this Post");
    }
  }
}

export const postsService = new PostsService();
