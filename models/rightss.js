
const fs = require('fs');



    var obj = JSON.parse(fs.readFileSync('articles_talal.json', 'utf8'));
    console.log(obj.articles.length)
   
    articles=obj.articles;

    for(var i of articles){

        if(i.chapternum==1){

            i.tags.push("rights")
        }
    }

    fs.writeFileSync('rightss.json', JSON.stringify(articles,null,4));
