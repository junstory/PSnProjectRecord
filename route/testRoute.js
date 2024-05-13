import express from "express";

import asyncHandler from "express-async-handler";
import { imgGenerator, tableGenerator } from "../controllers/test.controller";

export const testRouter = express.Router({ mergeParams: true });

testRouter.get("/img", asyncHandler(imgGenerator));
testRouter.get("/table", asyncHandler(tableGenerator));
testRouter.get("/", (req, res) => {
  res.send("hello!");
});
