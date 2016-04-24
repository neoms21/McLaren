"use strict";

var should = require('should');
var Repo = require('../../repos/repo.js');
var key = 'foo';
var value = {'bar': 'baz'};
var repo;

beforeEach(function () {
  repo = new Repo(['bar']);
});

describe('put', function() {
  it('should create a value if it does not exist', function (done) {
    repo.put(key, value);
    repo.get(key).then(function (read) {
      read.should.be.exactly(value);
      done();
    });
  });

  it('should update a value', function (done) {
    var newValue = {"bar": "bax"};
    repo.put(key, value).then(function () {
      return repo.put(key, newValue);
    }).then(function () {
      return repo.get(key);
    }).then(function (read) {
      read.should.be.exactly(newValue);
      done();
    });
  });

  it('should return a bad request when the fields are not correct', function (done) {
    repo.put(1, {'quux': 'bar'}).then(function () {}, function (err) {
      err.status.should.be.exactly(400);
      done();
    });
  });

  it('should return a bad request when the id does not exist' , function (done) {
    repo.put(null, value).then(function () {}, function (err) {
      err.status.should.be.exactly(400);
      done();
    });
  });
});

describe('get', function() {
  it('should throw an error if there is no value with that key', function (done) {
    repo.get(key).then(function () {}, function (err) {
      err.status.should.be.exactly(404);
      done();
    });
  });

  it('should return the value if there is one', function (done) {
    repo.put(key, value);
    repo.get(key).then(function (read) {
      read.should.be.exactly(value);
      done();
    });
  });
});

describe('post', function() {
  it('should generate a key, store the value at that key, and return the key', function (done) {
    repo.post(value).then(function (newKey) {
      return repo.get(newKey);
    }).then(function (read) {
      read.should.be.exactly(value);
      done();
    });
  });
});

describe('delete', function() {
  it('should delete a value at a key', function (done) {
    repo.put(key, value);
    repo.delete(key);
    repo.get(key).then(function () {}, function (err) {
      err.status.should.be.exactly(404);
      done();
    });
  });

  it('should return an empty array after deleting a key', function (done) {
    repo.put(key, value);
    repo.delete(key);
    repo.list().then(function (read) {
      read.should.be.empty();
      done();
    }, function () {});
  });

  it('should return a bad request when the id does not exist' , function (done) {
    repo.put(null, value).then(function () {}, function (err) {
      err.status.should.be.exactly(400);
      done();
    });
  });
});

describe('patch', function() {
  it('should partially update a value', function (done) {
    var repo = new Repo(['a', 'b']);
    var firstObject = { 'a': 'Alpha', 'b': 'Beta' };
    var secondObject = { 'b': 'Charlie' };
    var thirdObject = { 'a': 'Alpha', 'b': 'Charlie' };
    repo.put(key, firstObject).then(function () {
      return repo.patch(key, secondObject);
    }).then(function () {
      return repo.get(key);
    }).then(function (read) {
      read.should.be.match(thirdObject);
      done();
    });
  });

  it('should throw an error if there is no value at that key', function (done) {
    repo.patch(key, value).then(function () {}, function (err) {
      err.status.should.be.exactly(404);
      done();
    });
  });
});

describe('list', function() {
  it('return a list of values in the repo', function (done) {
    repo = new Repo(['a', 'b']);
    var firstObject = { 'a': 'Apple', 'b': 'Beta' };
    var secondObject = { 'a': 'Beta', 'b': 'Charlie' };
    var thirdObject = { 'a': 'Charlie', 'b': 'Delta' };
    repo.put(1, firstObject).then(function() {
      repo.put(2, secondObject);
    }).then(function() {
      repo.put(3, thirdObject);
    }).then(function() {
      return repo.list();
    }).then(function(list) {
      list.should.be.match([firstObject, secondObject, thirdObject]);
      done();
    });
  });
});
