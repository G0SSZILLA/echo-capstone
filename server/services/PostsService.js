import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class PostService {
    async getAll(userEmail) {
        return await dbContext.Posts.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Posts.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board")
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
            throw new BadRequest("Invalid ID or you do not own this board");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Posts.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
    }

}


export const PostsService = new PostsService()