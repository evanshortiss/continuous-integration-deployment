'use strict';


var route = new require('express').Router()
  , users = require('lib/users');

module.exports = function (app) {

  // Bind our router as a /users API
  app.use('/users', route);

  // Try to parse body if request has "Content-Type: application/json"
  route.use(require('body-parser').json());

  // A GET route, e.g GET /users/0
  route.get('/:id', function (req, res, next) {
    users.getBy('id', parseInt(req.params.id, 10), function (err, user) {
      if (err) {
        next(err);
      } else if (!user) {
        res.status(404).json({
          status: 'not ok'
        });
      } else {
        res.json(user);
      }
    });
  });

  // A PUT route, e.g PUT /users/0 with JSON body {"firstname": "jane"}
  route.put('/:id', function (req, res, next) {
    users.updateById(req.params.id, req.body, function (err, user) {
      if (err) {
        next(err);
      } else if (!user) {
        res.status(404).json({
          status: 'not ok'
        });
      } else {
        res.json(user);
      }
    });
  });
};
