const express = require('express');
const request = require('request');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

app.get('/results', (req, res) => {
  const searchTerm = req.query.search;
  const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=album`;
  request(url, function(error, response, body) {
    console.log('error:', error);
    const data = JSON.parse(body);
    console.log('body:', data);
    res.render('results', { data });
  });
});

app.listen(3000, () => console.log('serving is listening on port 3000'));
