'use strict';

var expect = require('chai').expect;

describe(__filename, function () {

  var counter;

  beforeEach(function () {
    delete require.cache[require.resolve('./index.js')];
    counter = require('./index.js');
  });

  describe('#getList', function () {
    it('should return an object', function () {
      expect(Object.keys(counter.getList())).to.have.length(0);
      expect(counter.getList()).to.be.an('object');
    });
  });

  describe('#incrementForUrl', function () {
    it('should increment a number', function () {
      counter.incrementForUrl('a');

      expect(counter.getList()).to.have.property('a');
      expect(counter.getList().a).to.equal(1);
    });

    it('should increment an existing number', function () {
      counter.incrementForUrl('b');
      counter.incrementForUrl('b');

      expect(counter.getList()).to.have.property('b');
      expect(counter.getList().b).to.equal(2);
    });
  });

});
