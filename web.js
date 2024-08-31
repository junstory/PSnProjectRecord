//pm2로 자동화 코드
//pm2 start web.js --watch --ignore-watch="public/* .git/* lib/* views/*"
// const express = require("express");
// const vhost = require("vhost");
// const path = require("path");
import express from "express";
import path from "path";

//router 추가
// const mainRouter = require("./route/mainRoute.js");
// const planRouter = require("./route/planRoute.js");
// const yebbiRouter = require("./route/yebbiRoute.js");
//const testRouter = require("./route/testRoute.js");
import { mainRouter } from "./route/mainRoute.js";
import { planRouter } from "./route/planRoute";
import { yebbiRouter } from "./route/yebbiRoute.js";
import { testRouter } from "./route/testRoute.js";

//firebase연동 처음부터 해야 함.
//const firebase = require("firebase");
//const mapJs = require("./lib/datashow.js");

const app = express();
const plan = express();
const yebbi = express();
const test = express();

const domain = "junstudy.com";
const port = 3000;
const plan_port = 5000;
const yebbi_port = 1203;
const test_port = 8808;

//view engine 설정 : ejs 사용
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //폴더, 폴더경로 지정
plan.set("view engine", "ejs");
plan.set("views", path.join(__dirname, "views")); //폴더, 폴더경로 지정

//yebbi.set("view engine", "ejs");
//yebbi.set("views", path.join(__dirname, "views")); //폴더, 폴더경로 지정
yebbi.use(express.static(path.join(__dirname, "public"))); //폴더, 폴더경로 지정

//가상호스트로 서브도메인도 사용되도록 해준 모습
//app.use(vhost(`plan.${domain}`, plan));
app.use("/", mainRouter);
plan.use("/", planRouter);
yebbi.use("/", yebbiRouter);
test.use(express.json());
test.use("/", testRouter);

//없는 주소&요청이면 오류 페이지 연결

// .listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(port, function () {
  console.log(`main listening on ${port}`);
});

plan.listen(plan_port, function () {
  console.log(`plan listening on ${plan_port}`);
});

yebbi.listen(yebbi_port, function () {
  console.log(`yebbi listening on ${yebbi_port}`);
});

test.listen(test_port, function () {
  console.log(`test listening on ${test_port}`);
});
