const express = require('express');
const router = express.Router();
const article = require('../models/article');



router.get('/getallarticles',function(req,res){

console.log("ALLARTICLES me aya");


article.find({},function(err,articless){

	console.log("find me aya")
	console.log(articless)
	res.json({articles:articless})
})



})


router.post('/addcrowdsource', function(req,res,next) {
	console.log(req.body.contrib)
	let comment = {
		username: req.body.username,
		contrib : req.body.contrib,
		date: new Date().toLocaleDateString(),
		language: req.body.language,
		number: req.body.number
	};

	article.addcomment(comment, (err, comm) => {
		if(err){
		  res.json({success: false, msg:'Failed to register user'});
		} else {
		  res.json({success: true, msg:'Inserted'});
		}
	  });

});

router.post('/search',(req,res)=>{
console.log("SEARCH")
let searchtags = req.body.searchtags.map(t=>t.toLowerCase())

article.find({$or:[{tags:{$in:searchtags}}, {category:{$in:searchtags}}]},function(err,art){

if(art.length){
	console.log("search found")
	console.log(art.length);
	res.json({searched:true, articleslist: art})

}else{
	res.json({searched:false})
	console.log("no search found")
}

})





})


router.post('/searchbynumber',(req,res)=>{

let num = req.body.number
console.log(num)

article.find({number:num},function(err,art){

if(art.length){
	console.log("search found")
	res.json({found:true, article: art})
}else{
	res.json({found:false})
	console.log("no search found")
}

})





})

module.exports = router;
