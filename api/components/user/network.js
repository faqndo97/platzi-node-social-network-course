const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', function (req, res, next) {
  Controller.list()
    .then((list) => {
      response.success(req, res, list, 200);    
    })
    .catch(next);
})

router.post('/', function (req, res, next) {
  Controller.upsert(req.body)
    .then((itemId) => {
      response.success(req, res, itemId, 200);
    })
    .catch(next)
})

router.get('/:id', function (req, res, next) {
  Controller.get(req.params.id)
    .then((item) => {
      response.success(req, res, item, 200);
    })
    .catch(next)
})

router.put('/', secure('update'), function (req, res, next) {
  Controller.upsert(req.body)
    .then((itemId) => {
      response.success(req, res, itemId, 200);
    })
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  Controller.remove(req.params.id)
    .then((item) => {
      response.success(req, res, item, 200);
    })
    .catch(next)
})

router.post('/follow/:id', secure('follow'), function(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
})

router.get('/:id/following', function(req, req, next) {
  Controller.following(req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
})

module.exports = router;