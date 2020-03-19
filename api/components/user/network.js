const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', function (req, res) {
  Controller.list()
    .then((list) => {
      response.success(req, res, list, 200);    
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    })
})

router.post('/', function (req, res) {
  Controller.upsert(req.body)
    .then((itemId) => {
      response.success(req, res, itemId, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    })
})

router.get('/:id', function (req, res) {
  Controller.get(req.params.id)
    .then((item) => {
      response.success(req, res, item, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    })
})

router.put('/:id', function (req, res) {
  Controller.upsert(req.body)
    .then((itemId) => {
      response.success(req, res, itemId, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    })
})

router.delete('/:id', function (req, res) {
  Controller.remove(req.params.id)
    .then((item) => {
      response.success(req, res, item, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    })
})

module.exports = router;