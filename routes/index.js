var express = require('express');
var router = express.Router();
var cards = require('../cards.json').whiteCards;
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/card', function(req, res){
    let min = Math.ceil(0);
    let max = Math.floor(cards.length);
    let randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return res.json({name:cards[randomNumber]});
})

module.exports = router;
