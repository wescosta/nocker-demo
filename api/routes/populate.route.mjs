import Router from "express";
import post from "../model/post.model";
import posts from "../data/prepopulate-data.json";
import handle from "../utils/res.handler";

export default Router()
  .get('/populate', (req, res, next) => post.insertMany(posts, handle(res, next)))