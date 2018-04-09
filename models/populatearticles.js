const config = require('../config/database');
const Article = require('./article');
const fs = require('fs');


function insertarticle(article,callback){
    var date= new Date(article.lastmodified);
    var year= date.getFullYear()
    

let newarticle = new Article({

	title:article.title,
	number:article.number,

	text: article.text,

	lastmodified: year,

	tags: article.tags.map(tag => tag.toLowerCase()),
    category: article.category.map(cat => cat.toLowerCase())

})

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


read('articlenew.txt', function(data) {
    art = data;
    arrayofarticlestext = art.split('@')
    var obj = JSON.parse(fs.readFileSync('articlesnew.json', 'utf8'));
    console.log(obj.articles.length)
    console.log(arrayofarticlestext.length)
    articles=obj.articles;

    for(var i = 0; i < arrayofarticlestext.length;i++){

        articles[i].text=arrayofarticlestext[i]
        insertarticle(articles[i],(err,data)=>{

            if(err){
                return false;
            }else{
                console.log("insert horha hai");
            }
        })

    }



});

