const config = require('../config/database');
const Article = require('./article');
const fs = require('fs');


function insertarticle(article,callback){
    var date= new Date(article.lastmodified);
    var year= date.getFullYear()
    var newarticle
    if (article.chaptername != null){

    newarticle = new Article({

	title:article.title.split(" ").map(n=>n.toLowerCase()),
	number:article.number,
	text: article.text,
	lastmodified: article.lastmodified,
	tags: article.tags.map(tag => tag.toLowerCase()),
    category: article.category.map(cat => cat.toLowerCase()),
    chaptername: article.chaptername.split(" ").map(n=>n.toLowerCase()),
    chapternum: article.chapternum

})
    }
    else {
    newarticle = new Article({

            title:article.title.split(" "),
            number:article.number,
            text: article.text,
            lastmodified: year,
            tags: article.tags.map(tag => tag.toLowerCase()),
            category: article.category.map(cat => cat.toLowerCase()),
            chaptername: null,
            chapternum: null
        
        })
    }


let newtags = article.text.split(" ");
for (var i of newtags){

    newarticle.tags.push(i);
}

newarticle.save(callback)

}


function read(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

var art;
var arrayofarticlestext;
var articles;


//var fs = require('fs');


read('articlenew_talal.txt', function(data) {
    art = data;
    arrayofarticlestext = art.split('@')
    var obj = JSON.parse(fs.readFileSync('articles_talal.json', 'utf8'));
    console.log(obj.articles.length)
    console.log(arrayofarticlestext.length)
    articles=obj.articles;

    for(var i = 0; i < arrayofarticlestext.length;i++){

        articles[i].text=arrayofarticlestext[i]
        console.log(articles[0].text[0])
        insertarticle(articles[i],(err,data)=>{

            if(err){
                return false;
            }else{
                console.log("insert horha hai");
            }
        })

    }
    



});

