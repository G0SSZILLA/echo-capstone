import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { postService } from "../services/PostsService";
import { commentService } from '../services/CommentsService'

export class PostController extends BaseController {
    constructor() {
        super("api/Posts");
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get("", this.getAll)
            .get('/:id/comments', this.getCommentsByPostId)
            .get("/:id", this.getById)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete)

    }

    async getAll(req, res, next) {
        try {
            let data = await postService.getAll(req.user.email);
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }
    async getCommentsByPostId(req, res, next) {
        try {
            let data = await commentService.getCommentByPostId(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            let data = await postService.getById(req.params.id, req.userInfo.email);
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email;
            let data = await postService.create(req.body);
            return res.status(201).send(data);
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            let data = await postService.edit(
                req.params.id,
                req.userInfo.email,
                req.body
            );
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await postService.delete(req.params.id);
            return res.status(204).send("Successfully deleted");
        } catch (error) {
            next(error);
        }
    }

}