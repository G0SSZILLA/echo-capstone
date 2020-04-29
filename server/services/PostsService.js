import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class PostsService {
    async getAll() {
        return await dbContext.Posts.find({}).populate("creator", "name picture")
    }

    async getById(id) {
        let data = await dbContext.Posts.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Post")
        }
        return data
    }
    async getPostsByUserEmail(userEmail) {
        let data = await dbContext.Posts.find({ creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Post")
        }
        return data
    }
    async create(rawData) {
        let data = await dbContext.Posts.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Posts.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Post");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Posts.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Post");
        }
    }

}


export const postsService = new PostsService()