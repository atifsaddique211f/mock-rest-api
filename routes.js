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

router.get('/api/v1/asset/:id', function(req, res) {
  getFixture('asset-list');
  var fixture = fixtures.filter(function(item) {
    if(item.assetId == req.params.id)return item;
  });
  res.send(fixture[0]);
});

router.delete('/api/v1/asset/:id', function(req, res) {
  getFixture('asset-list');
  var fixture = fixtures.filter(function(item) {
    if(item.assetId == req.params.id)return item;
  });
  fixtures.splice(fixtures.indexOf(fixture[0]),1);
  res.send(fixture[0]);
});

router.post('/api/v1/asset', function(req, res) {
  if(req.body.assetId){
    var fixture = fixtures.filter(function(item) {
      if(item.assetId == req.body.assetId)return item;
    });
    fixtures.splice(fixtures.indexOf(fixture[0]),1);
  }
  else {
    req.body.assetId = ++maxId;
  }
  fixtures.push(req.body);
  res.send(req.body);
});


module.exports = router;
