var express = require('express');
var _ = require('lodash');
var router = express.Router();
var repos = require('../repos');
var uuid = require('node-uuid');
var ResponseUtils = require('../utils/response-utils.js');

router.get('/', function(req, res, next) {
  repos.stories.list().then(ResponseUtils.json(res), next);
})

.post('/', function(req, res, next) {
  repos.stories.post(req.body).then(function (newId) {
    res
      .status(201)
      .location('/v1/stories/' + newId)
      .json(newId);
  }, next);
})

.get('/:storyId', function(req, res, next) {
  repos.stories.get(req.params.storyId).then(ResponseUtils.json(res), next);
})

.patch('/:storyId', function(req, res, next) {
  var id = req.params.storyId;
  repos.stories.patch(id, req.body).then(function (result) {
    res
      .status(200)
      .location('/v1/stories/' + id)
      .json(result);
  }, next);
})

.delete('/:storyId', function(req, res, next) {
  var id = req.params.storyId;
  repos.stories.delete(id).then(ResponseUtils.noContent(res), next);
});

module.exports = router;
