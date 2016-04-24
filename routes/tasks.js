var express = require('express');
var router = express.Router();
var repos = require('../repos');
var Promise = require("bluebird");
var ResponseUtils = require('../utils/response-utils.js');

/* Routes */

router.get('/', function(req, res, next) {
  repos.tasks.list().then(ResponseUtils.json(res), next);
})

.post('/', function(req, res, next) {
  // TODO Refactor this.
  var idPromise = repos.tasks.post(req.body);
  var taskPromise = idPromise.then(function(id) {
    return repos.tasks.get(id);
  });
  Promise.all([idPromise, taskPromise]).spread(function(id, task) {
    var location = '/v1/tasks/' + id;
    res.status(201).location(location).json(task);
  });
})

.get('/:id', function(req, res, next) {
  repos.tasks.get(req.params.id).then(ResponseUtils.json(res), next);
})

.patch('/:id', function(req, res, next) {
  repos.tasks.patch(req.params.id, req.body).then(ResponseUtils.json(res), next);
})

.delete('/:id', function(req, res, next) {
  repos.tasks.delete(req.params.id).then(ResponseUtils.noContent(res), next);
});

module.exports = router;
