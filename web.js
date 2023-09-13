//pm2로 자동화 코드
//pm2 start web.js --watch --ignore-watch="public/* .git/* lib/* views/*"
const express = require('express');
const vhost = require("vhost");

//router 추가
const mainRouter = require("./route/mainRoute.js");

//firebase연동 처음부터 해야 함.
//const firebase = require("firebase");
//const mapJs = require("./lib/datashow.js");

const app = express();
const plan = express();
const domain = `junstudy.com`;
const port = 3000;

//view engine 설정 : ejs 사용
app.set('view engine', 'ejs');

//사용자의 요청, ejs 리소스 모두  public에서 찾음.
app.use(express.static('public'));

//가상호스트로 서브도메인도 사용되도록 해준 모습
app.use(vhost(`plan.${domain}`, plan));
app.use('/', mainRouter);

plan.get("/",(req,res)=>{
  res.end("Success!");
})

//없는 주소&요청이면 오류 페이지 연결


// .listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(port, function() {
    console.log(`listening on ${port}`);
});
