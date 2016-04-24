"use strict";

var uuid = require('node-uuid');
var _ = require('lodash');
var Promise = require("bluebird");

var Repo = function(fields) {
  this.fields = fields;
  this.values = {};
};

Repo.prototype.get = function(id) {
  var self = this;
  return new Promise(function (fulfill, reject) {
    var value = self.values[id];
    if (value) {
      fulfill(value);
    } else {
      var err = new Error('Not Found');
      err.status = 404;
      reject(err);
    }
  });
};

Repo.prototype.put = function(id, value) {
  var self = this;
  return new Promise(function (fulfill, reject) {
    if (id) {
      var time = new Date().toISOString();
      if(self.values[id] === undefined) {
        value.created = time;
      } else {
        //created can't be overwritten
        value.created = self.values[id].created;
      }
      value.modified = time;
      value.id = id;
      self.values[id] = value;
      var keys = _(value)
        .keys()
        .difference(["id", "created", "modified"])
        .value();
      if(_.difference(keys, self.fields).length === 0 &&
         _.difference(self.fields, keys).length === 0) {
        fulfill(value);
      } else {
        var invalidObjError = new Error('Bad Request');
        invalidObjError.status = 400;
        reject(invalidObjError);
      }
    } else {
      var err = new Error('Bad Request');
      err.status = 400;
      reject(err);
    }
  });
};

Repo.prototype.post = function(value) {
  var self = this;
  return new Promise(function (fulfill, reject) {
    var id = uuid.v4();
    self.put(id, value).then(function (obj) {
      fulfill(id);
    }, reject);
  });
};

Repo.prototype.delete = function(id) {
  var self = this;
  return new Promise(function (fulfill, reject) {
    if (id) {
      var value = self.values[id];
      if (value) {
        delete self.values[id];
        fulfill(value);
      } else {
        var notFoundError = new Error('Not Found');
        notFoundError.status = 404;
        reject(notFoundError);
      }
    } else {
      var badRequestError = new Error('Bad Request');
      badRequestError.status = 400;
      reject(badRequestError);
    }
  });
};

Repo.prototype.patch = function(id, partial) {
  var self = this;
  return new Promise(function (fulfill, reject) {
    var badRequestError;
    if (id && partial) {
      var value = self.values[id];
      if (value) {
        var keys = _(value)
          .keys()
          .difference(["id", "created", "modified"])
          .value();
        if(_.difference(keys, self.fields).length === 0) {
          var time = new Date().toISOString();
          value.modified = time;
          self.values[id] = _.merge(value, partial);
          fulfill(self.values[id]);
        } else {
          badRequestError = new Error('Bad Request');
        }
      } else {
        var notFoundError = new Error('Not Found');
        notFoundError.status = 404;
        reject(notFoundError);
      }
    } else {
      badRequestError = new Error('Bad Request');
      badRequestError.status = 400;
      reject(badRequestError);
    }
  });
};

Repo.prototype.list = function() {
  var self = this;
  return new Promise(function (fulfill, reject) {
    var listWithIds = _.forIn(self.values, function (value, key) {
      return value;
    });
    fulfill(_.values(listWithIds));
  });
};

module.exports = Repo;
