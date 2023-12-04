const express = require("express");
const router = express.Router();

router.use(express.static('public'));

router.get("/",(req,res)=>{
  res.render('yebbi');
})

router.use((req,res)=>{
  res.render('404');
});

module.exports = router;
