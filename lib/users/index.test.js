'use strict';

var expect = require('chai').expect
  , sinon = require('sinon');

describe(__filename, function () {

  var mod = null;

  beforeEach(function () {
    // Get a new instance each time
    delete require.cache[require.resolve('./index.js')];
    mod = require('./index.js');
  });

  describe('#getBy', function () {
    it('should return a user', function (done) {
      mod.getBy('id', 0, function (err, u) {
        expect(err).to.be.null;
        expect(u).to.be.an('object');
        expect(u).to.have.property('firstname');

        done();
      });
    });

    it('should return null', function (done) {
      mod.getBy('id', 5670, function (err, u) {
        expect(u).to.not.exist;
        expect(err).to.be.null;

        done();
      });
    });
  });

  describe('#updateById', function () {
    it('should update a user', function (done) {
      mod.updateById(0, {
        firstname: 'node.js'
      }, function (err, u) {
        expect(u).to.be.an('object');
        expect(u).to.have.property('firstname');
        expect(u.firstname).to.equal('node.js');

        // Ensure the property is persisted
        mod.getBy('id', 0, function (err, u) {
          expect(u.firstname).to.equal('node.js');

          done();
        });
      });
    });

    it('should return an error', function (done) {
      mod.getBy = sinon.stub();
      mod.getBy.callsArgWith(2, new Error(), null);

      mod.updateById(0, {
        firstname: 'node.js'
      }, function (err, u) {
        expect(err).to.be.an('Error');
        expect(u).to.be.null;

        done();
      });
    });
  });

});
