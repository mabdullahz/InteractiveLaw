const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var wordnet = require('wordnet');
var swearjar = require('swearjar');

// var Dictionary = require("oxford-dictionary-api");

// var app_id = "700d2520"; var app_key = "4336541c91a2533a8c3650cc2e17ab69";

// var dict = new Dictionary(app_id,app_key);

// dict.find("ace",function(error,data){ if(error) return console.log(error); console.log(data); });



// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');
const articles = require('./routes/articles')

// Port Number
const port = 4000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/articles',articles)






// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});




app.post('/checkbadword',(req,res)=>{

var word = req.body.word

//word is actually the list of words

var newword = word.map(w => swearjar.profane(w))
if (newword.includes(true))
{
res.json({badword:true})
}else{
	res.json({badword:false})
}



})


app.post('/meaning',(req,res)=>{


var word = req.body.word
console.log("AGYAAAAA")
word.toLowerCase();
wordnet.lookup(word, function(err, definitions) {

	if(err){
		return res.json({check:false})
	}
   res.json({check:true, meaning:definitions[0].glossary});
  
});


})




// Start Server
app.listen(port,() => {
  console.log('Server started on port '+port);
});
