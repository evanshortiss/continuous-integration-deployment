'use strict';

var sinon = require('sinon')
  , expect = require('chai').expect
  , express = require('express')
  , supertest = require('supertest')
  , proxyquire = require('proxyquire');

describe(__filename, function () {

  var mw
    , stubs
    , counter = 'lib/request-counter'
    , incrementStub
    , getStub;

  beforeEach(function () {
    stubs = {};

    getStub = sinon.stub();
    incrementStub = sinon.stub();

    stubs[counter] = {
      getList: getStub,
      incrementForUrl: incrementStub
    };

    delete require.cache[require.resolve('./request-counter.js')];
    mw = proxyquire('./request-counter.js', stubs);
  });

  describe('#middleware', function () {
    it('should return an object', function () {
      mw.middleware({
        url: '/test'
      }, null, function (err) {
        expect(err).to.not.exist;
        expect(incrementStub.called).to.be.true;
        expect(incrementStub.getCall(0).args[0]).to.equal('/test');
      });
    });
  });

  describe('#router', function () {
    it('should increment a number', function (done) {
      getStub.returns({
        '/test': 12
      });

      var app = express();

      app.use(mw.router);

      var request = supertest(app);

      request.get('/list')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res).to.be.an('object');
          expect(res.body['/test']).to.equal(12);

          done();
        });
    });
  });

});
