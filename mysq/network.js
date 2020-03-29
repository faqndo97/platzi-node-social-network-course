const express = require('express');

const response  = require('../network/response');
const Store     = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table/:id', insert);
router.post('/:table/:id', update);
router.delete('/:table/:id', remove);

async function list(req, res, next) {
  Store.list(req.params.table)
    .then((data) => {
      response.success(req, res, data, 200);    
    })
    .catch(next);
}

async function get(req, res, next) {
  Store.get(req.params.table, req.params.id)
    .then((data) => {
      response.success(req, res, data, 200);    
    })
    .catch(next);
}

async function insert(req, res, next) {
  Store.insert(req.params.table, req.body)
    .then((data) => {
      response.success(req, res, data, 200);    
    })
    .catch(next);
}

async function update(req, res, next) {
  Store.update(req.params.table, req.body)
    .then((data) => {
      response.success(req, res, data, 200);    
    })
    .catch(next);
}

async function remove(req, res, next) {
  Store.remove(req.params.table, req.params.id)
  .then((data) => {
    response.success(req, res, data, 200);
  })
  .catch(next);
}

module.exports = router;