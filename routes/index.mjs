import Router from "express";
import post from "./post.route";
import populate from "./populate.route";
import health from "./health.route";

export default Router()
    .use(health)
    .use(populate)
    .use(post)