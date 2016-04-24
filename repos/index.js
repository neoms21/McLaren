"use strict";

var Repo = require('./repo.js');

var Repos = function() { };

Repos.prototype.stories = new Repo([
  "priority",
  "persona",
  "feature",
  "justification"
]);

Repos.prototype.tasks = new Repo([
  "story_id",
  "priority",
  "description",
  "status"
]);

module.exports = new Repos();
