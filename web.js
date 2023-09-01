//pm2로 자동화 코드
//pm2 start web.js --watch --ignore-watch="public/* .git/* lib/* views/*"
const express = require('express');
const template = require(`./lib/template.js`);

const app = express();
const port = 3000;
//view engine 설정 : ejs 사용
app.set('view engine', 'ejs');
//사용자가 요청을 public에서 찾음.
app.use(express.static('public'));

//보여주는 부분
/*
app.get('/', (req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
});
*/
app.get('/', (req,res)=>{
  let pathname = req.query.id;
  console.log(pathname);
  if(pathname === 'home'){
    res.render('main',{});
  }
  else if(pathname === 'projects'){
    res.render('projects',{});
  }
  else{
    res.render('main', {});
  }
});

app.get('/form', (req,res)=>{
  res.sendFile(__dirname + "/public/form.html");
});

app.get('/maps', (req,res)=>{
  res.render('main',{});
});

app.post('/public/form.ejs', function(req, res){
  res.render('form', {'name' : req.body.name})
});

//없는 주소&요청이면 오류 페이지 연결
app.use((req,res)=>{
  res.render('404');
});

// .listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(port, function() {
    console.log(`listening on ${port}`);
});
