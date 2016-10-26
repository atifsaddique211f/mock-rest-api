var express = require('express');
var app = express();
var router = express.Router();
var fixtures;
var maxId = 5;

var getFixture = function(fixtureName) {
  if(fixtures) {
    return fixtures;
  }
  fixtures = require('./fixtures/' + fixtureName + '.json');
  return fixtures;
};

router.get('/api/v1/assets', function(req, res) {
  res.send(getFixture('asset-list'));
});

router.post('/api/v1/asset', function(req, res) {
  req.body.assetId = ++maxId;
  fixtures.push(req.body);
  res.send(req.body);
});


module.exports = router;
