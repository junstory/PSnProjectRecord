const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const gpt = new OpenAI();
router.use(express.static("public"));

router.get("/", (req, res) => {
  res.render("plan");
});

router.get("/test", async (req, res) => {
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

router.use((req, res) => {
  res.render("404");
});

module.exports = router;
