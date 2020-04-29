import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
// @ts-ignore
import commentsService from "../services/CommentsService"
// @ts-ignore
import postsService from "../services/PostsService"
export class ProfilesController extends BaseController {
  
  constructor() {
    super("api/profile");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .get ("/:id/comment")
      .get("/;id/post")
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }
  async delete(req, res, next) {
try {
  await profilesService.delete(req.params.id)
  return res.send("Profile Deleted")
} catch (error) {
  next(error)
}  }

  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
async getCommentsByUserId(req,res,next){
  try {
    let data = await commentsService.getCommentsByUserId(req.params.id)
    return res.send(data)
  } catch (error) {
    next(error)
  }
}
async getPostsByUserId(req,res,next){
  try {
    let data = await postsService.getPostsByUserId(req.params.id)
  } catch (error) {
    next(error)
  }
}
}