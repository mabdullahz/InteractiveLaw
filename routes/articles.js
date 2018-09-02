const express = require('express');
const router = express.Router();
const article = require('../models/article');



router.get('/getallarticles',function(req,res){

console.log("ALLARTICLES me aya");


article.find({},function(err,articless){
	for(var i of articless){

		i.title = (i.title!=null)? i.title.join(" ") : i.title
		i.chaptername = (i.chaptername!=null) ? i.chaptername.join(" "):i.chaptername
	}
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
//article.index({ text: "text" });
var flag = req.body.flag;
console.log(flag);
var arr = [ { $or:[{tags:{$in:req.body.keyword}},{category:{$in:req.body.keyword}} ] },{chaptername:{$in:req.body.chaptername}},{chapternum:req.body.chapternumber},{title:{$in:req.body.articlename}},{number:req.body.articlenumber}]
var ress = []

for (var i in flag){
	if(flag[i]==true){
		ress.push(arr[i])
	}
}



article.find({$and:ress},function(err,art){

	if(art!=undefined){
 if(art.length){
	
	for(var i of art){

		i.title = (i.title!=null)? i.title.join(" ") : i.title
		i.chaptername = (i.chaptername!=null) ? i.chaptername.join(" "):i.chaptername
	}
console.log("server")
console.log(art[0].text)
	res.json({searched:true, articleslist: art})

 }else{
	res.json({searched:false})
	
}
	}else{
		res.json({searched:false})
	}

})

 
})

router.post('/searchbynumber',(req,res)=>{

let num = req.body.number


article.find({number:num},function(err,art){



if(art.length){
	console.log("search found")
	for(var i of art){

		i.title = (i.title!=null)? i.title.join(" ") : i.title
		i.chaptername = (i.chaptername!=null) ? i.chaptername.join(" "):i.chaptername
	}
	res.json({found:true, article: art})
}else{
	res.json({found:false})
	console.log("no search found")
}

})





})
module.exports = router;