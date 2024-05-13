//const express = require("express");
import express from "express";
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const gpt = new OpenAI();

export const planRouter = express.Router({ mergeParams: true });
planRouter.use(express.static("public"));

planRouter.get("/", (req, res) => {
  res.render("plan");
});

planRouter.get("/test", async (req, res) => {
  console.log(req.query);
  const response = await gpt.images.generate({
    model: "dall-e-3",
    prompt: req.query.prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log(response);
  let image_url = response.data[0].url;
  console.log(image_url);
  res.send(image_url);
});

planRouter.use((req, res) => {
  res.render("404");
});
