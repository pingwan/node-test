const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname  + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log("failed to write log");
    }
  })
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
})


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() + 1;
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  //res.send('<h1>Hello express</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: "Hello guys!"
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About page'
  });
});

app.listen(3000, () => {
  console.log('Server has started');
});
