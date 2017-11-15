'use strict';

var bodyParser = require('body-parser');
var cors = require('cors');
var snapshot = require('./snapshot');

var configureServer = function configureServer(app) {
  app.use(cors());
  app.use(bodyParser.json());

  app.post('/snapguidist', function (req, res) {
    var result = snapshot(req.body.name, req.body.tree);

    res.send(result);
  });

  app.put('/snapguidist', function (req, res) {
    var update = 'all';
    var result = snapshot(req.body.name, req.body.tree, update);

    res.send(result);
  });
};

module.exports = configureServer;