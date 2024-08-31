//const express = require("express");
import express from "express";
import path from "path";
export const yebbiRouter = express.Router({ mergeParams: true });

yebbiRouter.use('/',express.static(path.join(__dirname, "public")));

yebbiRouter.get("/", (req, res) => {
  console.log(path.join(__dirname, '../public/index.html'))
  res.sendFile(path.join(__dirname, '../public/index.html'));
  //res.render("yebbi");
});

// yebbiRouter.use((req, res) => {
//   res.render("404");
// });
