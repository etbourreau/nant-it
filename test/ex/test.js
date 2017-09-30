var request = require('supertest');
var app = require('/nant-it/app/index.js');
 
describe('GET /', function() {
  it('respond with hello world', function(done) {
    request(app).get('/').expect('hello world', done);
  });
});
