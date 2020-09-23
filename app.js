// dependencies for the app 
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

// express middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

// route to render index page
app.get('/', (req, res) => res.render('index'));

// route to get the results of the search term
app.get('/results', (req, res) => {
  // gets search term from index page
  const searchTerm = req.query.search;
  const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=album`;
  request(url, function (error, response, body) {
    console.log('error:', error);
    const data = JSON.parse(body);
    res.render('results', {
      data
    });
  });
});

// connect app to localhost port
app.listen(process.env.PORT || 3000, () => console.log('serving is listening on port 3000'));