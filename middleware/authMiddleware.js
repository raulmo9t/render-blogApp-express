import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { RiTokenSwapFill } from "react-icons/ri";

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.verify(token, process.env.SECRET_KEY);

      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      if (error) {
        let err = new Error("Not authorized, Token failed");
        err.statusCode = 401;
        next(err);
      }
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};

export const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Not authorized as an admin");
    error.statusCode = 401;
    next(error);
  }
};
