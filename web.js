// 서버를 만들기 위한 기본 문법!

const express = require('express');
const app = express();
const port = 3000;

// .listen(서버띄울 포트번호, 띄운 후 실행할 코드)
app.listen(port, function() {
    console.log(`listening on ${port}`);
});

app.get('/', (req,res)=>{
  res.send(__dirname + `/public/index.html`);
});
