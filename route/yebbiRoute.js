//const express = require("express");
import express from "express";
export const yebbiRouter = express.Router({ mergeParams: true });
yebbiRouter.use(express.static("public"));

yebbiRouter.get("/", (req, res) => {
  res.render("yebbi");
});

yebbiRouter.use((req, res) => {
  res.render("404");
});
