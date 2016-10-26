var express = require('express');
var router = express.Router();

var getFixture = function(fixtureName) {
  return require('./fixtures/' + fixtureName + '.json')
};

router.get('/api/v1/assets', function(req, res) {
  res.send(getFixture('asset-list'));
});


module.exports = router;
