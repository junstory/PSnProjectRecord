//const express = require("express");
import express from "express";
export const mainRouter = express.Router({ mergeParams: true });
//사용자의 요청, ejs 리소스 모두  public에서 찾음.
mainRouter.use(express.static("public"));

mainRouter.get("/", (req, res) => {
  let pathname = req.query.id;
  if (pathname === "home") {
    res.render("main", {});
  } else if (pathname === "projects") {
    res.render("projects", {});
  } else {
    res.render("main", {});
  }
});

mainRouter.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

mainRouter.get("/maps", (req, res) => {
  res.render("khufoodmap", {});
});

mainRouter.post("/public/form.ejs", function (req, res) {
  res.render("form", { name: req.body.name });
});

//TEST Space  START
mainRouter.get("/test/:tag", (req, res) => {
  const p = req.params;
  console.log(p);
});

mainRouter.use((req, res) => {
  res.render("404");
});
