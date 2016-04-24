"use strict";

var ResponseUtils = function() {};

ResponseUtils.prototype.json = function(res) {
  return function(obj) {
    res.json(obj);
  };
};

ResponseUtils.prototype.noContent = function(res) {
  return function() {
    res.status(204).send();
  };
};

module.exports = new ResponseUtils();
