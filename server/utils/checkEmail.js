import { BadRequest } from "./Errors"

export default function CheckEmail(req, res, next) {
  try {
    if (req.userInfo.email_verified == true) {
      next()
    } else {
      throw new BadRequest("Email is not verified.")
    }
  } catch (error) {
    next(error)
  }
}