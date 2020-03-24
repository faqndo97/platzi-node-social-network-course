const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', function (req, res, next) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      console.log(token);
      response.success(req, res, token, 200);    
    })
})

module.exports = router;