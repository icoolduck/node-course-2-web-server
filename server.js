const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {       // how we register a middleware
  var now = new Date().toString();
  var log = `${now}:  ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log.')
  });
  next();                          // without next would not proceed
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome my friend, we love you.',
    //currentYear: new Date().getFullYear()
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About This Page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Unable to handle request'});
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
