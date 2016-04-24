var request = require('supertest');
var app = require('../../app');

describe('GET /v1/tasks', function() {
  it('should return an empty list of tasks', function(done) {
    request(app)
      .get('/v1/tasks')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([])
      .end(done);
  });
});

describe('POST /v1/tasks', function() {
  it('should return a location', function(done) {
    request(app)
      .post('/v1/tasks')
      .send({
        'story_id': 'fb61237c-99b4-41fe-bf29-cb10fde1213a',
        'priority': 1,
        'description': 'create JSON fixtures for stories',
        'status': 'to do'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect('Location', /\/v1\/tasks\/\w+/)
      .end(done);
  });
});

describe('GET /v1/tasks/id', function() {
  it('should return a task', function(done) {
    var body = {
      'story_id': 'fb61237c-99b4-41fe-bf29-cb10fde1213a',
      'priority': 1,
      'description': 'create JSON fixtures for stories',
      'status': 'to do'
    };
    request(app)
      .post('/v1/tasks')
      .send(body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect('Location', /^\/v1\/tasks\/[-\w]+$/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          var location = res.get('Location');
          var idRegex = /^\/v1\/tasks\/([-\w]+$)/g;
          var id = idRegex.exec(location)[1];
          request(app)
            .get(res.get('Location'))
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                done(err);
              } else {
                res.body.id.should.be.equal(id);
                res.body.story_id.should.be.equal(body.story_id);
                res.body.priority.should.be.equal(body.priority);
                res.body.description.should.be.equal(body.description);
                res.body.status.should.be.equal(body.status);
                done();
              }
            });
        }
      });
  });
});

describe('PATCH /v1/tasks/id', function() {
  it('should update a task', function(done) {
    var body = {
      'story_id': 'fb61237c-99b4-41fe-bf29-cb10fde1213a',
      'priority': 1,
      'description': 'create JSON fixtures for stories',
      'status': 'to do'
    };
    request(app)
      .post('/v1/tasks')
      .send(body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect('Location', /\/v1\/tasks\/\w+/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          request(app)
            .patch(res.get('Location'))
            .send({'priority': 2})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) {
                done(err);
              } else {
                res.body.priority.should.be.equal(2);
                done();
              }
            });
        }
      });
  });
});

describe('DELETE /v1/tasks/id', function() {
  it('should return no content', function(done) {
    var body = {
      'story_id': 'fb61237c-99b4-41fe-bf29-cb10fde1213a',
      'priority': 1,
      'description': 'create JSON fixtures for stories',
      'status': 'to do'
    };
    request(app)
      .post('/v1/tasks')
      .send(body)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect('Location', /\/v1\/tasks\/\w+/)
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          request(app)
            .delete(res.get('Location'))
            .expect(204)
            .end(done);
        }
      });
  });
});
