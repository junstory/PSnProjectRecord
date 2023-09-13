const express = require("express");
const router = express.Router();

router.get('/', (req,res)=>{
  let pathname = req.query.id;
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

router.get('/form', (req,res)=>{
  res.sendFile(__dirname + "/public/form.html");
});

router.get('/maps', (req,res)=>{
  res.render('khufoodmap',{});
});

router.post('/public/form.ejs', function(req, res){
  res.render('form', {'name' : req.body.name})
});

//TEST Space  START
router.get('/test/:tag', (req,res)=>{
  const p = req.params;
  console.log(p)
})

router.use((req,res)=>{
  res.render('404');
});

module.exports = router;
