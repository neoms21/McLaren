var request = require('supertest');
var app = require('../../app');
var _ = require('lodash');

var req = {
  "priority": 1,
  "persona": "product owner",
  "feature": "create new stories in the backlog",
  "justification": "request features"
};

describe('GET /v1/stories', function() {
  it('should return a list of stories', function (done) {
    request(app)
      .get('/v1/stories')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([])
      .end(done);
  });
});

describe('POST /v1/stories', function() {
  it('should return a story and location', function (done) {
    request(app)
      .post('/v1/stories')
      .send(req)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect('Location', /v1\/stories/)
      .end(function(err, res) {
        if(err) {
          done(err);
        } else {
          var returnedReq = req;
          returnedReq.id = res.body;
          returnedReq.modified = "now";
          returnedReq.created = "now";

          request(app)
            .get(res.get('Location'))
            .expect(function (res) {
              res.body.modified = "now";
              res.body.created = "now";
            })
            .expect(returnedReq)
            .end(done);
        }
      });
  });
});

describe('PATCH /v1/stories/id', function() {
  var id;
  beforeEach(function (done) {
    request(app)
      .post('/v1/stories/')
      .send(req)
      .end(function (err, res) {
        id = res.body;
        done();
      });
  });

  it('should return an updated story', function (done) {
    request(app)
      .patch('/v1/stories/' + id)
      .send({
        "priority": 2
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if(err) {
          done(err);
        } else {
          request(app)
            .get('/v1/stories/' + res.body.id)
            .expect(res.body)
            .end(done);
        }
      });
  });
});

describe('DELETE /v1/stories/id', function() {
  var id;
  beforeEach(function (done) {
    request(app)
      .post('/v1/stories/')
      .send(req)
      .end(function (err, res) {
        id = res.body;
        done();
      });
  });

  it('should return no content', function (done) {
    request(app)
      .delete('/v1/stories/' + id)
      .expect(204)
      .end(function (err, res) {
        if(err) {
          done(err);
        } else {
          request(app)
            .get('/v1/stories/' + id)
            .expect(404)
            .end(done);
        }
      });
  });
});
