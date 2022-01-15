import express from "express";
import { database } from "../config/helpers.js";

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default usersRouter;
