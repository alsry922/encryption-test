import express from "express";
import {
  handleHome,
  getSignUp,
  postSingUp,
  getSignIn,
  postSignIn,
  getMod,
  postMod,
  getHash,
  postHash,
} from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", handleHome);
rootRouter.route("/sign-up").get(getSignUp).post(postSingUp);
rootRouter.route("/sign-in").get(getSignIn).post(postSignIn);
rootRouter.route("/modulated").get(getMod).post(postMod);
rootRouter.route("/hash-value").get(getHash).post(postHash);

export default rootRouter;
