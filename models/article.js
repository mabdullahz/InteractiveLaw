const mongoose = require('mongoose');
const config = require('../config/database');
mongoose.connect(config.database)

const ArticleSchema = mongoose.Schema({

	title:{
		type: Array,
		require: true
	},
	number:{
		type:String,
		require:true
	},

	text :{
		type: String,
		require: true,
	},

	lastmodified:{

		type: String
	},

	tags:{
		type: Array
	},
	category:{
		type:Array
	},
	crowdsource:{
		type:Array
	},
	chaptername: {
		type: Array
	},
	chapternum: {
		type: Number
	}

})

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.addcomment = function(comment,callback){
	var query = {number: comment.number}
	Article.update(query,{$push: {crowdsource: comment}},callback)
}

