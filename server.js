const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine','hbs');

app.use((req,res,next)=> {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('Unable to append server log');
		}
	});
	next();
});

//app.use((req,res,next) => {
//	res.render('maintance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('scremIt', (text) => {
	return text.toUpperCase()
});

//app.get('/', (req, res) => {
//	//	res.send('<h1>Hello user</h1>');
//	res.send({
//		name: 'Mansi',
//		likes: ["reading", "codeing"]
//	});
//});

app.get('/', (req, res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Page',
//		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome To Home Page'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page'
//		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMeassage: 'Unable to handle request'
	});
});

app.listen(3000, () => {
	console.log("server is running on port 3000");
});


//app.listen(3000);