import express from "express";

import asyncHandler from "express-async-handler";
import {
  imgGenerator,
  tableGenerator,
  getScore,
} from "../controllers/test.controller";

export const testRouter = express.Router({ mergeParams: true });

testRouter.get("/img", asyncHandler(imgGenerator));
testRouter.get("/table", asyncHandler(tableGenerator));
testRouter.get("/link", asyncHandler(getScore));

testRouter.get("/", (req, res) => {
  console.log("TESTRoute");
  res.send("hello!");
});
