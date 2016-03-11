'use strict';

/**
 * This is a sample express middlware.
 *
 * Typically express middleware is a function that is executed for each incoming
 * request. Examples include a cookie parser or session handling middleware.
 *
 * Sometimes middleware will also expose a router to allow clients to access
 * their functionality in some way.
 *
 * Our example below counts how many times a particular url has been called
 * by clients. It also exposes a router that we can optionally expose to allow
 * clients determine how often a route has been called.
 */

var counter = require('lib/request-counter')
  , router = require('express').Router();


/**
 * An express middleware function. Notice that it looks just like a regular
 * route except we need to call "next" to ensure the request is handled by the
 * rest of our sever i.e it gets passed along to the relevant handler.
 *
 * @param  {IncomingRequest}    req
 * @param  {OutgoingResponse}   res
 * @param  {Function}           next
 */
exports.middleware = function (req, res, next) {
  counter.incrementForUrl(req.url);
  next();
};


// Exposes a router with just a GET /list function
exports.router = router.get('/list', function (req, res) {
  res.json(counter.getList());
});
